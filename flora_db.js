// 🌿 FLORA DIRECTORY

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

"peperomia_orba": {
name: "Teardrop Peperomia",
type: "Tropical Epiphyte",


metabolism: "cam", 
toxic_pets: false, 
lunar_affinity: "waxing", 
stamp_img: "Piperales.png",


temp_floor: 55, 
temp_ceiling: 80, 
optimal_temp: [65, 75], 


min_humidity: 40,
vpd_range: [0.8, 1.1], 
water_frequency: "low", 
water_schedule: "1-2 weeks", 
wind_tolerance: 10, 


pest_risks: {
dry: ["Thrips", "Spider Mites"], 
wet: ["Root Rot", "Root Mealybugs", "Shore Flies", "Fungus Gnats" ], 
general: ["Scales", "Whitefies", "Mealybugs"]
},

seasons: {
spring: {
optimal_temp: [72, 78],
night_temp_trigger: [65, 68], 
water_schedule: "1-2 weeks"
},
summer: {
optimal_temp: [72, 78],
night_temp_trigger: [65, 68], 
water_schedule: "1-2 weeks"
},
fall: {
optimal_temp: [65, 68],
night_temp_trigger: [60, 62], 
water_schedule: "2-3 weeks"
},
winter: {
optimal_temp: [65, 68],
night_temp_trigger: [60, 62], 
water_schedule: "2-3 weeks"
}
}
},


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
        },
        seasons: {
            summer: { optimal_temp: [70, 85], water_schedule: "5-7 days" },
            fall:   { optimal_temp: [55, 65], water_schedule: "7-10 days" },
            winter: { optimal_temp: [50, 60], water_schedule: "3-4 weeks" }
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
    }
};

window.floraDB = floraDB;
