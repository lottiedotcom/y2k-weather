// 🌿 FLORA DIRECTORY (flora_db.js) 🌿
// The scientific baseline for the Agronomy Engine, featuring VPD and Pest Radar

const floraDB = {
    // ==========================================
    // 🌿 CATEGORY 1: THE INDOOR JUNGLE
    // ==========================================
    "rhaphidophora_tetrasperma": {
        name: "Mini Monstera",
        type: "Tropical Epiphyte",
        temp_floor: 50, 
        temp_ceiling: 95, 
        optimal_temp: [68, 82],
        min_humidity: 60,
        water_frequency: "moderate",
        wind_tolerance: 15, 
        toxic_pets: true,
        lunar_affinity: "waxing", 
        stamp_img: "mini_monstera_stamp.png",
        vpd_range: [0.8, 1.2],
        pest_risk: "spider_mites"
    },
"epipremnum_aureum": {
name: "Golden pothos",
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
},
    "maranta_leuconeura": {
        name: "Prayer Plant",
        type: "Herbaceous Perennial",
        temp_floor: 55,
        temp_ceiling: 90,
        optimal_temp: [65, 80],
        min_humidity: 60,
        water_frequency: "high",
        wind_tolerance: 5, 
        toxic_pets: false,
        lunar_affinity: "waxing",
        stamp_img: "prayer_plant_stamp.png",
        vpd_range: [0.6, 1.0],
        pest_risk: "spider_mites"
    },
    "chlorophytum_comosum": {
        name: "Spider Plant",
        type: "Herbaceous Perennial",
        temp_floor: 35,
        temp_ceiling: 95,
        optimal_temp: [55, 80],
        min_humidity: 30,
        water_frequency: "moderate",
        wind_tolerance: 20,
        toxic_pets: false,
        lunar_affinity: "full", 
        stamp_img: "spider_plant_stamp.png",
        vpd_range: [0.8, 1.5],
        pest_risk: "aphids"
    },
    "nepeta_cataria": {
        name: "Catnip",
        type: "Herbaceous Perennial",
        temp_floor: -20, 
        temp_ceiling: 90,
        optimal_temp: [55, 75],
        min_humidity: 40,
        water_frequency: "moderate",
        wind_tolerance: 25,
        toxic_pets: false,
        lunar_affinity: "waning",
        stamp_img: "catnip_stamp.png",
        vpd_range: [1.0, 1.5],
        pest_risk: "whiteflies"
    },

    // ==========================================
    // 🥕 CATEGORY 2: THE OUTDOOR EDIBLES
    // ==========================================
    "raphanus_sativus": {
        name: "French Breakfast Radish",
        type: "Cool-Weather Taproot",
        temp_floor: 20, 
        temp_ceiling: 80, 
        optimal_temp: [45, 68],
        min_humidity: 50,
        water_frequency: "high",
        wind_tolerance: 30, 
        toxic_pets: false,
        lunar_affinity: "waning", 
        stamp_img: "radish_stamp.png",
        vpd_range: [0.8, 1.2],
        pest_risk: "flea_beetles"
    },
    "solanum_lycopersicum": {
        name: "Cherry Tomato",
        type: "Warm Annual",
        temp_floor: 40,
        temp_ceiling: 95,
        optimal_temp: [70, 88],
        min_humidity: 40,
        water_frequency: "high",
        wind_tolerance: 15,
        toxic_pets: true, 
        lunar_affinity: "waxing",
        stamp_img: "tomato_stamp.png",
        vpd_range: [1.0, 1.5],
        pest_risk: "hornworms"
    },
    "ocimum_basilicum": {
        name: "Sweet Basil",
        type: "Tender Annual",
        temp_floor: 45, 
        temp_ceiling: 100,
        optimal_temp: [75, 92],
        min_humidity: 40,
        water_frequency: "high",
        wind_tolerance: 10,
        toxic_pets: false,
        lunar_affinity: "waxing",
        stamp_img: "basil_stamp.png",
        vpd_range: [0.8, 1.2],
        pest_risk: "aphids"
    },
    "capsicum_annuum": {
        name: "Jalapeño Pepper",
        type: "Warm Perennial/Annual",
        temp_floor: 45,
        temp_ceiling: 105, 
        optimal_temp: [75, 95],
        min_humidity: 30,
        water_frequency: "moderate",
        wind_tolerance: 20,
        toxic_pets: true,
        lunar_affinity: "waxing",
        stamp_img: "jalapeno_stamp.png",
        vpd_range: [1.0, 1.5],
        pest_risk: "aphids"
    },
    "lactuca_sativa": {
        name: "Butterhead Lettuce",
        type: "Cool Leafy Green",
        temp_floor: 25,
        temp_ceiling: 75, 
        optimal_temp: [45, 65],
        min_humidity: 50,
        water_frequency: "high",
        wind_tolerance: 20,
        toxic_pets: false,
        lunar_affinity: "waxing",
        stamp_img: "lettuce_stamp.png",
        vpd_range: [0.6, 1.0],
        pest_risk: "slugs"
    },

    // ==========================================
    // 🌵 CATEGORY 3: THE DESERT HARDY
    // ==========================================
    "aloe_barbadensis": {
        name: "True Aloe Vera",
        type: "Succulent",
        temp_floor: 32, 
        temp_ceiling: 115,
        optimal_temp: [60, 85],
        min_humidity: 10,
        water_frequency: "very_low",
        wind_tolerance: 25,
        toxic_pets: true,
        lunar_affinity: "new",
        stamp_img: "aloe_stamp.png",
        vpd_range: [1.5, 2.5],
        pest_risk: "scale"
    },
    "echeveria_ghost": {
        name: "Ghost Echeveria",
        type: "Rosette Succulent",
        temp_floor: 30,
        temp_ceiling: 100,
        optimal_temp: [55, 80],
        min_humidity: 10,
        water_frequency: "very_low",
        wind_tolerance: 40, 
        toxic_pets: false,
        lunar_affinity: "waning",
        stamp_img: "echeveria_stamp.png",
        vpd_range: [1.5, 2.5],
        pest_risk: "mealybugs"
    },
    "sansevieria_trifasciata": {
        name: "Snake Plant",
        type: "Rhizomatous Succulent",
        temp_floor: 50,
        temp_ceiling: 110,
        optimal_temp: [65, 90],
        min_humidity: 20,
        water_frequency: "very_low",
        wind_tolerance: 20,
        toxic_pets: true,
        lunar_affinity: "new",
        stamp_img: "snake_plant_stamp.png",
        vpd_range: [1.2, 2.0],
        pest_risk: "root_rot"
    },
    "schlumbergera": {
        name: "Christmas Cactus",
        type: "Epiphytic Cactus",
        temp_floor: 35,
        temp_ceiling: 95,
        optimal_temp: [60, 75],
        min_humidity: 50, 
        water_frequency: "moderate",
        wind_tolerance: 10, 
        toxic_pets: false,
        lunar_affinity: "waning",
        stamp_img: "christmas_cactus_stamp.png",
        vpd_range: [0.8, 1.2],
        pest_risk: "fungus_gnats"
    },
    "senecio_rowleyanus": {
        name: "String of Pearls",
        type: "Trailing Succulent",
        temp_floor: 40,
        temp_ceiling: 90,
        optimal_temp: [60, 80],
        min_humidity: 20,
        water_frequency: "low",
        wind_tolerance: 5, 
        toxic_pets: true,
        lunar_affinity: "waxing",
        stamp_img: "string_pearls_stamp.png",
        vpd_range: [1.2, 1.8],
        pest_risk: "mealybugs"
    },

    // ==========================================
    // 🧬 CATEGORY 4: AROIDS
    // ==========================================
    // (Add Alocasias, Philodendrons, Syngoniums here)
    "syngonium_podophyllum": {
        name: "Arrowhead Plant - Syngonium podophyllum",
        type: "Tropical Aroid",
        temp_floor: 50,        // Leaves will suffer severe cold damage below this
        temp_ceiling: 95,      // Will wilt and stress in extreme heat
        optimal_temp: [65, 80], // Perfect indoor/shaded patio temperatures
        min_humidity: 50,      // Below 50%, the leaf tips will start to crisp
        water_frequency: "moderate", // Let the top inch of soil dry out
        wind_tolerance: 10,    // Thin leaves tear easily in heavy gusts
        toxic_pets: true,      // Highly toxic to cats!
        lunar_affinity: "waxing", // Responds well to upward sap flow for new leaves
        stamp_img: "arrowhead.png", // The name of the stamp you'll draw for it!
        vpd_range: [0.8, 1.2], // Optimal drying pressure for aroids
        pest_risk: "spider_mites" // Extremely vulnerable to mites if the air gets too dry
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
