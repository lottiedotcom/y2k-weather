// 🌍 CLIMATE & AGRONOMY ENGINE (climate_db.js) 🌍

const ClimateEngine = {

    getHardinessZone: function(lat) {
        const absLat = Math.abs(lat);
        if (absLat < 25) return { zone: "10-11", frostRisk: "None", season: "Tropical" };
        if (absLat >= 25 && absLat < 30) return { zone: "9", frostRisk: "Very Low", season: "Sub-Tropical" };
        if (absLat >= 30 && absLat < 35) return { zone: "8", frostRisk: "Low (Dec-Feb)", season: "Warm Temperate" };
        if (absLat >= 35 && absLat < 40) return { zone: "6-7", frostRisk: "Moderate (Nov-Mar)", season: "Temperate" };
        if (absLat >= 40 && absLat < 45) return { zone: "4-5", frostRisk: "High (Oct-Apr)", season: "Cool Temperate" };
        return { zone: "1-3", frostRisk: "Extreme (Sep-May)", season: "Arctic/Sub-Arctic" };
    },

    checkLethalGates: function(plant, weekTempsMin, weekTempsMax, maxWind) {
        // ✨ Added Math.round() to fix the ugly decimals! ✨
        const lowestTemp = Math.round(Math.min(...weekTempsMin));
        const highestTemp = Math.round(Math.max(...weekTempsMax));
        const roundedWind = Math.round(maxWind);

        if (lowestTemp <= plant.temp_floor) {
            return { pass: false, tag: "Strictly Indoors", reason: `Lethal cold! Temps dropping to ${lowestTemp}°F.` };
        }
        
        if (highestTemp >= plant.temp_ceiling) {
            return { pass: false, tag: "Move Inside/AC", reason: `Lethal heat! Temps spiking to ${highestTemp}°F.` };
        }

        if (roundedWind >= plant.wind_tolerance + 10) { 
            return { pass: false, tag: "Wind Hazard", reason: `Gusts up to ${roundedWind} mph will damage structure.` };
        }

        return { pass: true };
    },

    scoreComfort: function(plant, avgTemp, avgHumidity, rainTotal) {
        let score = 70; 

        if (avgTemp >= plant.optimal_temp[0] && avgTemp <= plant.optimal_temp[1]) {
            score += 15; 
        } else {
            score -= 10; 
        }

        if (avgHumidity >= plant.min_humidity) {
            score += 10;
        } else {
            score -= 15; 
        }

        if (rainTotal > 1.0) { 
            if (plant.water_frequency === "very_low") score -= 30; 
            if (plant.water_frequency === "high") score += 10; 
        } else if (rainTotal < 0.1) { 
            if (plant.water_frequency === "very_low") score += 10;
            if (plant.water_frequency === "high") score -= 20; 
        }

        if (score > 100) score = 100;
        if (score < 0) score = 0;

        return score;
    },

    applyLunarMultiplier: function(baseScore, plantLunarAffinity, currentMoonPhaseStr) {
        let isWaxing = currentMoonPhaseStr.includes("Waxing") || currentMoonPhaseStr.includes("New") || currentMoonPhaseStr.includes("1st Quarter");
        let isWaning = currentMoonPhaseStr.includes("Waning") || currentMoonPhaseStr.includes("Full") || currentMoonPhaseStr.includes("Last Quarter");

        let currentAffinity = "neutral";
        if (isWaxing) currentAffinity = "waxing";
        if (isWaning) currentAffinity = "waning";

        if (plantLunarAffinity === currentAffinity) {
            return Math.min(100, Math.round(baseScore * 1.25)); 
        }
        return baseScore;
    },

    runAnalysis: function(lat, lon, weekTempsMin, weekTempsMax, maxWind, avgTemp, avgHumidity, rainTotal, moonPhaseStr) {
        const zoneData = this.getHardinessZone(lat);
        const results = [];

        for (const [id, plant] of Object.entries(window.floraDB)) {
            
            const survival = this.checkLethalGates(plant, weekTempsMin, weekTempsMax, maxWind);
            
            if (!survival.pass) {
                results.push({
                    id: id,
                    plant: plant,
                    status: "Sanctuary Mode",
                    score: 0,
                    tag: survival.tag,
                    reason: survival.reason
                });
                continue; 
            }

            let comfortScore = this.scoreComfort(plant, avgTemp, avgHumidity, rainTotal);
            let finalScore = this.applyLunarMultiplier(comfortScore, plant.lunar_affinity, moonPhaseStr);

            let status = "";
            let tag = "";
            
            if (finalScore >= 90) {
                status = "Maximum Vibe";
                tag = "7-Day Clear / Optimal Sowing";
            } else if (finalScore >= 70) {
                status = "Shaded Canopy";
                tag = "24-Hour Patio Pass";
            } else {
                status = "Sanctuary Mode";
                tag = "Keep Indoors";
            }

            results.push({
                id: id,
                plant: plant,
                status: status,
                score: finalScore,
                tag: tag,
                reason: `Zone ${zoneData.zone} verified. Score: ${finalScore}/100.`
            });
        }

        results.sort((a, b) => b.score - a.score);
        return { zone: zoneData, recommendations: results };
    }
};

window.ClimateEngine = ClimateEngine;
