// 📖 PLANT DIARY MANAGER (diary_manager.js) 📖

const DiaryManager = {
    // 1. Get saved plants from your phone's local storage
    getPinned: function() {
        return JSON.parse(localStorage.getItem('plantDiary')) || {};
    },

    // 2. Save updates to local storage
    savePinned: function(data) {
        localStorage.setItem('plantDiary', JSON.stringify(data));
        this.renderGrid();
        if (typeof filterFlora === "function") filterFlora(); 
    },

    // 3. Pin or Unpin a plant
    togglePin: function(plantId) {
        let data = this.getPinned();
        if (data[plantId]) {
            delete data[plantId]; // Unpin
        } else {
            data[plantId] = { lastWatered: Date.now() }; // Pin new, default to right now
        }
        this.savePinned(data);
        
        // Re-render the main list so the pin button visually toggles
        if(window.lastWeatherState) {
            const state = window.lastWeatherState;
            const newResults = window.ClimateEngine.runAnalysis(
                state.lat, state.lon, state.weekTempsMin, state.weekTempsMax, state.dailyGusts, state.currentTemp, state.currentHumidity, state.rainTotal, state.moonPhaseStr, state.isDaytime
            );
            if (typeof renderAgronomy === "function") renderAgronomy(newResults);
        }
    },

    // 4. Record that you watered a plant with confirmation
    waterPlant: function(plantId) {
        if (confirm("Are you sure you watered this plant? This will reset the schedule!")) {
            let data = this.getPinned();
            if(data[plantId]) {
                data[plantId].lastWatered = Date.now();
                this.savePinned(data);
                this.closeModal();
            }
        }
    },

    // 5. Open the expanded plant view in the modal
    openExpandedView: function(plantId) {
        if (!window.latestAgronomyResults) return;
        
        const res = window.latestAgronomyResults.find(r => r.id === plantId);
        if (!res) return;

        let toxIcon = res.plant.toxic_pets ? "☣︎🐾" : "♡🐾";
        let pTip = res.primaryTooltip.replace(/'/g, "\\'");
        let sTip = res.secondaryTooltip.replace(/'/g, "\\'");

        let lifecycleHTML = "";
        if (res.plant.life_stages) {
            let currentDays = res.plant.days_since_planted !== undefined ? res.plant.days_since_planted : "";
            let inputId = `diary-days-input-${res.id}`;
            lifecycleHTML = `
                <div class="lifecycle-box" style="margin-top: 10px;">
                    <div class="lifecycle-label">🌱 Days Since Planted:</div>
                    <div class="lifecycle-input-group">
                        <input type="number" id="${inputId}" class="days-input" value="${currentDays}" placeholder="0">
                        <button class="lifecycle-btn" onclick="updateLifecycle('${res.id}', document.getElementById('${inputId}').value); DiaryManager.openExpandedView('${res.id}')">SET</button>
                    </div>
                </div>
            `;
        }

        let waterRaw = res.plant.water_schedule ? res.plant.water_schedule.toUpperCase() : "";
        let formattedWaterNeeds = waterRaw;
        if (waterRaw.includes(':')) {
            let splitText = waterRaw.split(':');
            formattedWaterNeeds = `<span style="color: var(--moe-pink); text-shadow: 1px 1px 0px white;">${splitText[0]}:</span>${splitText[1]}`;
        }

        const modalBody = document.getElementById('diary-modal-body');
        modalBody.innerHTML = `
            <div class="agronomy-card expanded" style="margin-bottom: 0; border: none; background: transparent; box-shadow: none;">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0;">
                    <img src="${res.plant.stamp_img}" alt="${res.plant.name}" class="plant-stamp" onerror="this.src='https://i.postimg.cc/Fs9tVbff/d1fbe1c35c32494c9290ebf699c16fc6.jpg'">
                    <span style="font-size: 0.7rem; font-weight: 700; color: var(--deep-sea); text-shadow: 1px 1px 0px white;">Live: ${res.liveVPD}</span>
                </div>
                
                <div class="plant-info">
                    <div class="plant-name">${res.plant.name} <span class="plant-toxicity">${toxIcon}</span></div>
                    
                    <div class="tag-container">
                        <div class="plant-tag ${res.tagClass}" onclick="alert('${pTip}')">${res.primaryTag}</div>
                        <div class="plant-tag tag-action" onclick="alert('${sTip}')">${res.secondaryTag}</div>
                    </div>
                    
                    <div class="plant-reason">${res.reason}</div>
                    
                    <div class="plant-details-hidden" style="display: block;">
                        ${lifecycleHTML}
                        <div class="stat-grid">
                            <div class="stat-cell-static">
                                <div class="stat-label-clean">Ideal VPD</div>
                                <div class="stat-value-clean">${res.idealVPDText || 'N/A'}</div>
                            </div>
                            <div class="stat-cell-static">
                                <div class="stat-label-clean">Temp Limits</div>
                                <div class="stat-value-clean">${res.plant.temp_floor}° - ${res.plant.temp_ceiling}°</div>
                            </div>
                            <div class="stat-cell-dynamic">
                                <div class="stat-label-clean">Ideal Temp</div>
                                <div class="stat-value-clean">${res.plant.optimal_temp[0]}° - ${res.plant.optimal_temp[1]}°</div>
                            </div>
                            <div class="stat-cell-dynamic">
                                <div class="stat-label-clean">Water Needs</div>
                                <div class="stat-value-clean">${formattedWaterNeeds}</div>
                            </div>
                            <div class="stat-cell-static">
                                <div class="stat-label-clean">Max Wind</div>
                                <div class="stat-value-clean">${res.plant.wind_tolerance} mph</div>
                            </div>
                            <div class="stat-cell-static">
                                <div class="stat-label-clean">Lunar Boost</div>
                                <div class="stat-value-clean ${res.isLunarBoostActive ? 'lunar-boost-active' : ''}">${res.plant.lunar_affinity.toUpperCase()}</div>
                            </div>
                        </div>
                        <div class="metabolism-box">
                            <div class="stat-label-clean">Metabolism</div>
                            <div class="metabolism-text">${res.respiration}</div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="refresh-btn" style="width: 100%; margin-top: 15px; background: linear-gradient(135deg, #00d084, #00f0ff); border: 2px dashed white;" onclick="DiaryManager.waterPlant('${res.id}')">💧 YES, I WATERED IT!</button>
        `;

        document.getElementById('diary-plant-modal').style.display = 'flex';
    },

    closeModal: function() {
        document.getElementById('diary-plant-modal').style.display = 'none';
        this.renderGrid();
    },

    // 6. Calculate priority and render the rows
    renderGrid: function() {
        const data = this.getPinned();
        const tier1 = document.getElementById('diary-tier-1'); 
        const tier2 = document.getElementById('diary-tier-2'); 
        const tier3 = document.getElementById('diary-tier-3'); 

        if(!tier1 || !tier2 || !tier3) return;

        tier1.innerHTML = ''; tier2.innerHTML = ''; tier3.innerHTML = '';

        if(Object.keys(data).length === 0) {
            tier2.innerHTML = `<div style="width: 100%; text-align: center; color: var(--deep-sea); font-size: 0.8rem; font-weight: 700; opacity: 0.6;">No plants pinned yet 📌</div>`;
            return;
        }

        const now = Date.now();

        Object.keys(data).forEach(id => {
            const plantData = window.floraDB[id];
            if (!plantData) return;

            // 1. How long has it been since we watered?
            const msSinceWatered = now - data[id].lastWatered;
            const daysSinceWatered = msSinceWatered / (1000 * 60 * 60 * 24);

            // 2. What is the watering schedule?
            let freq = 14; // Default to 14 days
            if (plantData.water_frequency === "high") freq = 3;
            else if (plantData.water_frequency === "moderate") freq = 7;
            else if (plantData.water_frequency === "low") freq = 14;
            else if (plantData.water_frequency === "very_low") freq = 30;

            // 3. How many days until it needs water again?
            const daysUntilWatering = freq - daysSinceWatered;

            // 4. Sort into the proper tier
            let targetTier = tier3; // Bottom (Recently watered)
            if (daysUntilWatering <= 3) {
                targetTier = tier1; // Top: Needs water in 3 days or less!
            } else if (daysUntilWatering <= 7) {
                targetTier = tier2; // Mid: Needs water in 7 days or less!
            }

            const stampHTML = `
                <div class="diary-stamp-container" onclick="DiaryManager.openExpandedView('${id}')">
                    <img src="${plantData.stamp_img}" alt="${plantData.name}" class="diary-stamp" onerror="this.src='https://i.postimg.cc/Fs9tVbff/d1fbe1c35c32494c9290ebf699c16fc6.jpg'">
                    <div class="diary-stamp-name">${plantData.name}</div>
                </div>
            `;
            targetTier.innerHTML += stampHTML;
        });
    }
};

window.DiaryManager = DiaryManager;

