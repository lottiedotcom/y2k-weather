// 🌍 UPDATED CLIMATE ENGINE (climate_db.js)

const ClimateEngine = {
    // ... [Keep getHardinessZone and scoreComfort as they were] ...

    runAnalysis: function(lat, lon, weekTempsMin, weekTempsMax, dailyGusts, avgTemp, avgHumidity, rainTotal, moonPhaseStr) {
        const zoneData = this.getHardinessZone(lat);
        const results = [];

        for (const [id, plant] of Object.entries(window.floraDB)) {
            // Find "Safe Days" by checking daily gust data
            let safeDays = [];
            dailyGusts.forEach((gust, index) => {
                if (gust <= plant.wind_tolerance) safeDays.push(index);
            });

            // Find the "Worst Day" index
            let worstDayIndex = dailyGusts.indexOf(Math.max(...dailyGusts));

            // Logic for the Tag
            let tag = "";
            let reason = "";

            if (safeDays.length === 0) {
                tag = "WIND HAZARD";
                reason = `Worst day: Day ${worstDayIndex + 1}. No safe window this week!`;
            } else if (safeDays.length === 7) {
                tag = "7-DAY CLEAR";
                reason = "Wind is safe all week!";
            } else {
                tag = `PATIO WINDOW: ${safeDays.length} Days`;
                reason = `Worst day: Day ${worstDayIndex + 1}. Safe: Days ${safeDays.map(d => d+1).join(', ')}.`;
            }

            results.push({
                id: id,
                plant: plant,
                status: safeDays.length > 0 ? "Maximum Vibe" : "Sanctuary Mode",
                tag: tag,
                reason: reason
            });
        }
        return { zone: zoneData, recommendations: results };
    }
};
window.ClimateEngine = ClimateEngine;
