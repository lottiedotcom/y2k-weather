// 🌿 FLORA DIRECTORY

const floraDB = {
    // ==========================================
    // 🌿 CATEGORY 1: THE INDOOR JUNGLE
    // ==========================================
"Rhaphidophora_tetrasperma": {
name: "Mini Monstera",
type: "Climbing Vine Aroid",
metabolism: "c3",
toxic_pets: true,
lunar_affinity: "waxing",
stamp_img: "minimonstera.png",
temp_floor: 55,
temp_ceiling: 95,
optimal_temp: [65, 85],
min_humidity: 40,
vpd_range: [0.8, 1.1],
water_frequency: "moderate",
water_schedule: "Water when top 1-2 of soil is dry!",
wind_tolerance: 15,
pest_risks: {
dry: ["Spider Mites", "Thrips"],
wet: ["Mealybugs", "Fungus Gnats"],
general: ["Scale", "Aphids"]
},
seasons: {
spring: {
optimal_temp: [70, 78],
night_temp_trigger: [62, 68],
water_schedule: "Water when top 2 inches of soil is dry"
},
summer: {
optimal_temp: [75, 85],
night_temp_trigger: [65, 72],
water_schedule: "Water when 1-2 inch of soil is dry"
},
fall: {
optimal_temp: [68, 74],
night_temp_trigger: [60, 65],
water_schedule: "Water when 1/3 of soil is dry"
},
winter: {
optimal_temp: [65, 70],
night_temp_trigger: [58, 62],
water_schedule: "Water when 1/2 of soil is dry"
}
}
},

    
    "epipremnum_aureum": {
        name: "Golden Pothos",
        type: "Tropical Epiphyte",
        metabolism: "c3",
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
            general: ["Scales", "Whiteflies", "Mealybugs"]
        },
        seasons: {
            spring: { optimal_temp: [72, 78], night_temp_trigger: [65, 68], water_schedule: "1-2 weeks" },
            summer: { optimal_temp: [72, 78], night_temp_trigger: [65, 68], water_schedule: "1-2 weeks" },
            fall:   { optimal_temp: [65, 68], night_temp_trigger: [60, 62], water_schedule: "2-3 weeks" },
            winter: { optimal_temp: [65, 68], night_temp_trigger: [60, 62], water_schedule: "2-3 weeks" }
        }
    },

    // ==========================================
    // 🌵 CATEGORY 2: THE DESERT HARDY
    // ==========================================
"dracaena_trifasciata": {
name: "Snake Plant",
type: "Succulent",
metabolism: "cam",
toxic_pets: true,
lunar_affinity: "new",
stamp_img: "snakeplant.png",
temp_floor: 50,
temp_ceiling: 100,
optimal_temp: [70, 80],
min_humidity: 30,
vpd_range: [1.2, 1.6],
water_frequency: "low",
water_schedule: "Water when soil is completely dry!",
wind_tolerance: 25,
pest_risks: {
dry: ["Spider Mites", "Thrips"],
wet: ["Root Mealybugs", "Fungus Gnats", "Mealybugs"],
general: ["Scale", "Fungal Leaf Spot"]
},
seasons: {
spring: {
optimal_temp: [70, 80],
night_temp_trigger: [60, 65],
water_schedule: "Water when soil is completely dry!"
},
summer: {
optimal_temp: [75, 90],
night_temp_trigger: [65, 70],
water_schedule: "Water when soil is completely dry!"
},
fall: {
optimal_temp: [70, 75],
night_temp_trigger: [55, 60],
water_schedule: "Water when soil is completely dry!"
},
winter: {
optimal_temp: [65, 70],
night_temp_trigger: [50, 55],
water_schedule: "Water when soil is completely dry!"
}
}
},

    
    "schlumbergera_truncata": {
        name: "Thanksgiving cactus",
        type: "Cacti",
        metabolism: "cam",
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
    // 🧬 CATEGORY 3: AROIDS
    // ==========================================
    "syngonium_podophyllum": {
        name: "Arrowhead Plant",
        type: "Tropical Aroid",
        metabolism: "c3",
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
    // 🍃 CATEGORY 4: VINING PLANTS
    // ==========================================
    "hedera_canariensis": {
        name: "Algerian Ivy",
        type: "Climbing Vine",
        metabolism: "c3", 
        toxic_pets: true, 
        lunar_affinity: "waxing", 
        stamp_img: "algerianivy.png",
        temp_floor: 10, 
        temp_ceiling: 100, 
        optimal_temp: [68, 78], 
        min_humidity: 40,
        vpd_range: [0.8, 1.2], 
        water_frequency: "high", 
        water_schedule: "When top 1-2 inches are dry", 
        wind_tolerance: 25, 
        pest_risks: {
            dry: ["Thrips", "Spider Mites", "Scale"], 
            wet: ["Root Rot", "Bacterial Leaf Spot", "Foliar Mealybugs", "Fungus Gnats"], 
            general: ["Aphids", "Whiteflies", "Scale"]
        },
        seasons: {
            spring: { optimal_temp: [68, 78], night_temp_trigger: [50, 60], water_schedule: "When top 1-2 inches are dry" },
            summer: { optimal_temp: [68, 78], night_temp_trigger: [60, 65], water_schedule: "When top 1-2 inches are dry" },
            fall:   { optimal_temp: [60, 70], night_temp_trigger: [50, 55], water_schedule: "10-14 days" },
            winter: { optimal_temp: [45, 55], night_temp_trigger: [40, 45], water_schedule: "2-3 weeks" }
        }
    },

    "hedera_helix": {
        name: "English / Common Ivy",
        type: "Climbing Vine",
        metabolism: "c3", 
        toxic_pets: true, 
        lunar_affinity: "waxing", 
        stamp_img: "commonivy.png",
        temp_floor: 45, 
        temp_ceiling: 90, 
        optimal_temp: [65, 75], 
        min_humidity: 45,
        vpd_range: [0.8, 1.2], 
        water_frequency: "moderate", 
        water_schedule: "When top inch is dry", 
        wind_tolerance: 25, 
        pest_risks: {
            dry: ["Thrips", "Spider Mites", "Scale"], 
            wet: ["Root Rot", "Bacterial Leaf Spot", "Foliar Mealybugs", "Fungus Gnats"], 
            general: ["Aphids", "Whiteflies", "Scale"]
        },
        seasons: {
            spring: { optimal_temp: [65, 70], night_temp_trigger: [55, 60], water_schedule: "When top inch is dry" },
            summer: { optimal_temp: [70, 75], night_temp_trigger: [60, 65], water_schedule: "When top inch is dry" },
            fall:   { optimal_temp: [60, 65], night_temp_trigger: [50, 55], water_schedule: "When top 1.5 - 2 inches is dry" },
            winter: { optimal_temp: [55, 60], night_temp_trigger: [45, 50], water_schedule: "Allow to dry almost completely" }
        }
    }
};

window.floraDB = floraDB;

