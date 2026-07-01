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

    // 🗓️ NEW: Calendar Tracker for Seasonal Profiles (Northern Hemisphere)
    getCurrentSeason: function() {
        const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
        if (month >= 2 && month <= 4) return "spring";
        if (month >= 5 && month <= 7) return "summer";
        if (month >= 8 && month <= 10) return "fall";
        return "winter";
    },

    calculateVPD: function(tempF, humidity) {
        const tempC = (tempF - 32) * (5/9);
        const svp = 0.61078 * Math.exp((17.27 * tempC) / (tempC + 237.3));
        const vpd = svp * (1 - (humidity / 100));
        return vpd; 
    },

    checkLethalGates: function(plant, weekTempsMin, weekTempsMax, maxWind) {
        const lowestTemp = Math.round(Math.min(...weekTempsMin));
        const highestTemp = Math.round(Math.max(...weekTempsMax));
        const roundedWind = Math.round(maxWind);

        if (lowestTemp <= plant.temp_floor) {
            return { pass: false, reason: `Lethal cold! Temps dropping to ${lowestTemp}°F.` };
        }
        if (highestTemp >= plant.temp_ceiling) {
            return { pass: false, reason: `Lethal heat! Temps spiking to ${highestTemp}°F.` };
        }
        if (roundedWind >= plant.wind_tolerance + 10) { 
            return { pass: false, reason: `Gusts up to ${roundedWind} mph will cause damage.` };
        }

        return { pass: true };
    },

    scoreComfort: function(plant, avgTemp, avgHumidity, rainTotal) {
        let score = 70; 
        if (avgTemp >= plant.optimal_temp[0] && avgTemp <= plant.optimal_temp[1]) score += 15; else score -= 10; 
        if (avgHumidity >= plant.min_humidity) score += 10; else score -= 15; 
        
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

    runAnalysis: function(lat, lon, weekTempsMin, weekTempsMax, dailyGusts, currentTemp, currentHumidity, rainTotal, moonPhaseStr) {
        if (!weekTempsMin || !weekTempsMax || !dailyGusts) {
            return { zone: {zone: "Unknown"}, recommendations: [] };
        }

        const zoneData = this.getHardinessZone(lat);
        const currentSeason = this.getCurrentSeason();
        const results = [];
        const currentVPD = this.calculateVPD(currentTemp, currentHumidity);

        for (const [id, originalPlant] of Object.entries(window.floraDB)) {
            
            // 🧬 CLONE THE PLANT: This lets us safely inject seasonal stats 
            // without permanently overwriting the main database.
            let activePlant = JSON.parse(JSON.stringify(originalPlant));

            // 🍂 SEASONAL OVERRIDE INJECTION
            if (activePlant.seasons && activePlant.seasons[currentSeason]) {
                const seasonStats = activePlant.seasons[currentSeason];
                if (seasonStats.optimal_temp) activePlant.optimal_temp = seasonStats.optimal_temp;
                if (seasonStats.water_frequency) activePlant.water_frequency = seasonStats.water_frequency;
                if (seasonStats.water_schedule) activePlant.water_schedule = seasonStats.water_schedule;
                if (seasonStats.min_humidity) activePlant.min_humidity = seasonStats.min_humidity;
                if (seasonStats.vpd_range) activePlant.vpd_range = seasonStats.vpd_range;
            }

            let safeDays = [];
            dailyGusts.forEach((gust, index) => {
                if (gust <= activePlant.wind_tolerance) safeDays.push(index);
            });

            let worstGust = Math.max(...dailyGusts);
            const survival = this.checkLethalGates(activePlant, weekTempsMin, weekTempsMax, worstGust);
            let comfortScore = this.scoreComfort(activePlant, currentTemp, currentHumidity, rainTotal);

            let isWaxing = moonPhaseStr.includes("Waxing") || moonPhaseStr.includes("New") || moonPhaseStr.includes("1st Quarter");
            let isWaning = moonPhaseStr.includes("Waning") || moonPhaseStr.includes("Full") || moonPhaseStr.includes("Last Quarter");
            let currentAffinity = isWaxing ? "waxing" : (isWaning ? "waning" : "neutral");

            if (activePlant.lunar_affinity === currentAffinity) {
                comfortScore = Math.min(100, Math.round(comfortScore * 1.25)); 
            }

            // 🐛 MULTI-PEST FALLBACK LOGIC
            let pData = activePlant.pest_risks || { dry: [], wet: [], general: [] };
            if (activePlant.pest_risk) { 
                if (activePlant.pest_risk.includes("mites") || activePlant.pest_risk.includes("white")) pData.dry = [activePlant.pest_risk];
                else if (activePlant.pest_risk.includes("slugs") || activePlant.pest_risk.includes("gnats")) pData.wet = [activePlant.pest_risk];
                else pData.general = [activePlant.pest_risk];
            }

            // 🌍 PRIMARY TAG LOGIC
            let primaryTag = "";
            let primaryTooltip = "";
            let tagClass = "";
            let reason = "";

            if (!survival.pass || worstGust >= activePlant.wind_tolerance + 10) {
                primaryTag = "STRICTLY INDOORS!!";
                primaryTooltip = "The outdoor environment has triggered a lethal gate (frost, severe wind, or heat). Keep strictly indoors.";
                tagClass = "tag-sanctuary";
                reason = survival.reason || `Worst gust: ${Math.round(worstGust)} mph.`;
                comfortScore = 0;
            } else {
                if (comfortScore >= 90 && safeDays.length === 7) {
                    primaryTag = "ALL CLEAR! (7 DAYS)";
                    primaryTooltip = "Absolute perfect conditions for planting seeds directly into the outdoor earth or full patio exposure.";
                    tagClass = "tag-max";
                } else {
                    primaryTag = "PART TIME PATIO";
                    primaryTooltip = "Safe for outdoors, but requires protection from direct UV scorch, heavy rainfall, or passing gusts.";
                    tagClass = "tag-shade";
                }
                reason = `Zone ${zoneData.zone} verified. Score: ${comfortScore}/100.`;
            }

            // ⚡ SECONDARY TAG LOGIC 
            let secondaryTag = "";
            let secondaryTooltip = "";

            if (worstGust >= activePlant.wind_tolerance + 10) {
                secondaryTag = "WIND HAZARD";
                secondaryTooltip = "It's too gusty. The leaves will tear or the pot will blow over.";
            } else if (currentVPD < activePlant.vpd_range[0] || rainTotal > 1.0) {
                if (pData.wet.length > 0) {
                    secondaryTag = "TOO WET / PEST RISK";
                    secondaryTooltip = `Cold/damp conditions! Watch out for: ${pData.wet.join(", ")}.`;
                } else {
                    secondaryTag = "TOO WET / ROOT ROT";
                    secondaryTooltip = "It's cold and damp. If you water it, the roots will rot.";
                }
            } else if (currentVPD > activePlant.vpd_range[1]) {
                if (pData.dry.length > 0) {
                    secondaryTag = "DRY!! PEST WARNING";
                    secondaryTooltip = `Hot/dry air is triggering pests! Check foliage for: ${pData.dry.join(", ")}.`;
                } else {
                    secondaryTag = "DRY!! WATER & CHECK SOIL";
                    secondaryTooltip = "The air is sucking the water out of the leaves. Water it now.";
                }
            } else if (currentVPD >= activePlant.vpd_range[0] && currentVPD <= activePlant.vpd_range[1] && activePlant.lunar_affinity === currentAffinity) {
                secondaryTag = "PERFECT FOR PROPAGATING!";
                secondaryTooltip = "The moon phase and humidity are perfectly aligned to chop the plant and propagate it.";
            } else {
                if (pData.general.length > 0) {
                    secondaryTag = "MONITOR FOR PESTS";
                    secondaryTooltip = `Vibing, but always keep an eye out for: ${pData.general.join(", ")}.`;
                } else {
                    secondaryTag = "VIBING PERFECTLY";
                    secondaryTooltip = "Conditions are stable. No urgent action needed.";
                }
            }

            // ✨ PUSH THE CLONED PLANT TO THE UI ✨
            results.push({
                id: id,
                plant: activePlant, // Pushes the updated clone so the UI renders the correct seasonal text!
                score: comfortScore,
                primaryTag: primaryTag,
                primaryTooltip: primaryTooltip,
                tagClass: tagClass,
                secondaryTag: secondaryTag,
                secondaryTooltip: secondaryTooltip,
                reason: reason,
                liveVPD: currentVPD.toFixed(2)
            });
        }

        results.sort((a, b) => b.score - a.score);
        return { zone: zoneData, recommendations: results };
    }
};

window.ClimateEngine = ClimateEngine;

