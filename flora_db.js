// 🌿 FLORA DIRECTORY (flora_db.js) 🌿
// The scientific baseline for the Agronomy Engine, featuring VPD and Pest Radar

const floraDB = {
    // ==========================================
    // 🌿 CATEGORY 1: THE INDOOR JUNGLE
    // ==========================================
    "epipremnum_aureum": {
        name: "Golden Pothos",
        type: "Tropical Epiphyte",
        temp_floor: 50,
        temp_ceiling: 90,
        optimal_temp: [65, 85],
        min_humidity: 30,
        water_frequency: "low",
        water_schedule: "1-2 weeks",
        wind_tolerance: 20,
        toxic_pets: true,
        lunar_affinity: "waxing",
        stamp_img: "goldenpothos.png",
        vpd_range: [0.8, 1.2],
        pest_risks: {
            dry: ["Thrips", "Spider Mites"],
            wet: ["Scales", "Mealybugs", "Fungus Gnats", "Root Rot"],
            general: ["Mealybugs", "Fungus Gnats"]
        }
    },

    // ==========================================
    // 🥕 CATEGORY 2: THE OUTDOOR EDIBLES
    // ==========================================
    // (Add your outdoor veggies and herbs here)

    // ==========================================
    // 🌵 CATEGORY 3: THE DESERT HARDY
    // ==========================================
    "schlumbergera_truncata": {
        name: "Thanksgiving cactus",
        type: "Cacti",
        temp_floor: 50,
        temp_ceiling: 80,
        optimal_temp: [60, 70],
        min_humidity: 40,
        water_frequency: "moderate",
        water_schedule: "7-10 days",
        wind_tolerance: 15,
        toxic_pets: false,
        lunar_affinity: "new",
        stamp_img: "thanksgiving.png",
        vpd_range: [0.6, 1.0],
        pest_risks: {
            dry: ["Thrips", "Spider Mites"],
            wet: ["Slugs", "Fungus Gnats"],
            general: ["Scale", "Aphids", "Mealybugs"]
        }
    },

    // ==========================================
    // 🧬 CATEGORY 4: AROIDS
    // ==========================================
    "syngonium_podophyllum": {
        name: "Arrowhead Plant",
        type: "Tropical Aroid",
        temp_floor: 50,        
        temp_ceiling: 95,      
        optimal_temp: [65, 80], 
        min_humidity: 50,      
        water_frequency: "low", 
        water_schedule: "1-2 weeks", 
        wind_tolerance: 10,    
        toxic_pets: true,      
        lunar_affinity: "waxing", 
        stamp_img: "arrowhead.png", 
        vpd_range: [0.8, 1.2], 
        pest_risks: {
            dry: ["Spider Mites"],
            wet: ["Root Rot", "Fungus Gnats"],
            general: ["Mealybugs", "Aphids"]
        }
    },

    // ==========================================
    // 🧪 CATEGORY 5: WITCHY PLANTS
    // ==========================================
    // (Add ritual herbs, Mugwort, Rosemary, etc. here)

    // ==========================================
    // 🕸️ CATEGORY 6: VINING
    // ==========================================
    // (Add Ivy, String of Hearts, etc. here)

    // ==========================================
    // ☠️ CATEGORY 7: POISON GARDEN
    // ==========================================
    // (Add highly toxic ornamentals here)

};

window.floraDB = floraDB;
