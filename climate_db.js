// 🌍 CLIMATE & AGRONOMY ENGINE (climate_db.js) 🌍
// This engine grabs your GPS, calculates the environment, and runs the 3-Phase survival gauntlet.

const ClimateEngine = {

    // ==========================================
    // 📍 1. GEOSPATIAL ZONE CALCULATOR
    // ==========================================
    // Approximates your USDA Hardiness Zone based on your Latitude (Northern Hemisphere)
    getHardinessZone: function(lat) {
        const absLat = Math.abs(lat);
        if (absLat < 25) return { zone: "10-11", frostRisk: "None", season: "Tropical" };
        if (absLat >= 25 && absLat < 30) return { zone: "9", frostRisk: "Very Low", season: "Sub-Tropical" };
        if (absLat >= 30 && absLat < 35) return { zone: "8", frostRisk: "Low (Dec-Feb)", season: "Warm Temperate" };
        if (absLat >= 35 && absLat < 40) return { zone: "6-7", frostRisk: "Moderate (Nov-Mar)", season: "Temperate" };
        if (absLat >= 40 && absLat < 45) return { zone: "4-5", frostRisk: "High (Oct-Apr)", season: "Cool Temperate" };
        return { zone: "1-3", frostRisk: "Extreme (Sep-May)", season: "Arctic/Sub-Arctic" };
    },

    // ==========================================
    // 🛑 2. PHASE 1: THE LETHAL GATES
    // ==========================================
    // Returns an instant FAIL if the environment will physically destroy the plant
    checkLethalGates: function(plant, weekTempsMin, weekTempsMax, maxWind) {
        const lowestTemp = Math.min(...weekTempsMin);
        const highestTemp = Math.max(...weekTempsMax);

        // Gate 1: The Frost/Freezing Gate
        if (lowestTemp <= plant.temp_floor) {
            return { pass: false, tag: "Strictly Indoors", reason: `Lethal cold! Temps dropping to ${lowestTemp}°F.` };
        }
        
        // Gate 2: The Furnace Gate
        if (highestTemp >= plant.temp_ceiling) {
            return { pass: false, tag: "Move Inside/AC", reason: `Lethal heat! Temps spiking to ${highestTemp}°F.` };
        }

        // Gate 3: The Gale Gate
        if (maxWind >= plant.wind_tolerance + 10) { // Adding a 10mph buffer for gusts
            return { pass: false, tag: "Wind Hazard", reason: `Gusts up to ${maxWind}mph will damage structure.` };
        }

        return { pass: true };
    },

    // ==========================================
    // 🧮 3. PHASE 2: THE COMFORT SPECTRUM
    // ==========================================
    // Scores the plant from 0 to 100 based on how perfectly the weather matches its specs
    scoreComfort: function(plant, avgTemp, avgHumidity, rainTotal) {
        let score = 70; // Base passing score

        // Temperature Curve
        if (avgTemp >= plant.optimal_temp[0] && avgTemp <= plant.optimal_temp[1]) {
            score += 15; // Perfect temp!
        } else {
            score -= 10; // Outside optimal range
        }

        // Humidity Curve
        if (avgHumidity >= plant.min_humidity) {
            score += 10;
        } else {
            score -= 15; // Too dry
        }

        // Precipitation / Watering Logic
        if (rainTotal > 1.0) { // Heavy rain week
            if (plant.water_frequency === "very_low") score -= 30; // Succulents drown
            if (plant.water_frequency === "high") score += 10; // Thirsty plants thrive
        } else if (rainTotal < 0.1) { // Bone dry week
            if (plant.water_frequency === "very_low") score += 10;
            if (plant.water_frequency === "high") score -= 20; 
        }

        // Cap score bounds
        if (score > 100) score = 100;
        if (score < 0) score = 0;

        return score;
    },

    // ==========================================
    // 🔮 4. PHASE 3: THE CELESTIAL MULTIPLIER
    // ==========================================
    applyLunarMultiplier: function(baseScore, plantLunarAffinity, currentMoonPhaseStr) {
        let isWaxing = currentMoonPhaseStr.includes("Waxing") || currentMoonPhaseStr.includes("New") || currentMoonPhaseStr.includes("1st Quarter");
        let isWaning = currentMoonPhaseStr.includes("Waning") || currentMoonPhaseStr.includes("Full") || currentMoonPhaseStr.includes("Last Quarter");

        let currentAffinity = "neutral";
        if (isWaxing) currentAffinity = "waxing";
        if (isWaning) currentAffinity = "waning";

        // Tech-Witch Intuition: If the moon matches the plant's affinity, boost the score!
        if (plantLunarAffinity === currentAffinity) {
            return Math.min(100, Math.round(baseScore * 1.25)); // 25% Boost
        }
        return baseScore;
    },

    // ==========================================
    // ⚙️ 5. THE MASTER RUNNER
    // ==========================================
    // This is the function the main app calls to get the final answers
    runAnalysis: function(lat, lon, weekTempsMin, weekTempsMax, maxWind, avgTemp, avgHumidity, rainTotal, moonPhaseStr) {
        const zoneData = this.getHardinessZone(lat);
        const results = [];

        // Loop through the flora_db (which must be loaded first in the HTML)
        for (const [id, plant] of Object.entries(window.floraDB)) {
            
            // Phase 1
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
                continue; // Skip to the next plant
            }

            // Phase 2
            let comfortScore = this.scoreComfort(plant, avgTemp, avgHumidity, rainTotal);

            // Phase 3
            let finalScore = this.applyLunarMultiplier(comfortScore, plant.lunar_affinity, moonPhaseStr);

            // Assign the Temporal Action Tag
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

        // Sort results from highest score to lowest
        results.sort((a, b) => b.score - a.score);
        return { zone: zoneData, recommendations: results };
    }
};

// Make it accessible to the main HTML file
window.ClimateEngine = ClimateEngine;
