// ------------------------------------------------Imports-----------------------------------------------

// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------

// envAccess -- function to access the environment variables
export const envAccess = (field) => {
  return process.env[field];
};

// -----------------------------------------------------------------------------------------------------------
// ----------------------------------------------CORS CONFIG---------------------------------------------

export const developmentWhiteListedIpAddresses = [
  "http://localhost:5173",
  "http://localhost:5174 ",
  "https://hot-house-9gco.vercel.app/",
  "https://hot-house.vercel.app/",
  "http://localhost:3000",
];

export const productionWhiteListedIpAddresses = ["https://hot-house.vercel.app/"];

export const corsConfig = () => {
  return envAccess("NODE_WORKING_ENVIRONMENT")
    ? {
        origin: developmentWhiteListedIpAddresses,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
        exposedHeaders: ["*", "Authorization"],
      }
    : {
        origin: productionWhiteListedIpAddresses,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
        exposedHeaders: ["*", "Authorization"],
      };
};
// -----------------------------------------------------------------------------------------------------------
// --------------------------------------------PIZZA CUSTOMIZATION---------------------------------------------

export const pizzaCustomization = {
  pizzaSizes: ["SUPER_SIZE", "LARGE", "MEDIUM", "SMALL"],
  pizzaBases: [
    "CHEEZY_CRUST",
    "DEEP_PAN",
    "HOT_DOG_CRUST",
    "PEPPERONI_CRUST",
    "THIN_CRUST",
  ],
  pizzaSauces: [
    "BBQ_SAUCE",
    "GARLIC_SAUCE",
    "HOT_BBQ_SAUCE",
    "SMOKY_SAUSAGE",
    "TOMATO_SAUCE",
    "NO_SAUCE",
  ],
  pizzaCheeses: ["3_BLEND_CHEESE", "MOZZARELLA", "NO_CHEESE"],
  pizzaVegToppings: [
    "BLACK_OLIVES",
    "CHILLI_FLAKES",
    "FETA_CHEESE",
    "FRESH_TOMATO",
    "GREEN_CHILLI",
    "GREEN_PEPPER",
    "JALAPENO",
    "MUSHROOMS",
    "MUSTARD_MAYO",
    "PINEAPPLE",
    "RED_ONION",
    "ROQUITO",
    "SLICED_GHERKIN",
    "SPECIAL_BURGER_SAUCE",
    "SPINACH",
    "SUN_DRIED_TOMATO",
    "SWEETCORN",
    "TOMATO_KETCHUP",
  ],
  pizzaMeatToppings: [
    "BACON",
    "BEEF",
    "CHICKEN",
    "CHICKEN_TIKKA",
    "CHORIZO_SAUSAGE",
    "GERMAN_HOT_DOG",
    "HAM",
    "MEATBALLS",
    "MEXICAN_CHICKEN",
    "PEPPERONI",
    "PERI_PERI_CHICKEN",
    "SALAMI",
    "SPICY_PORK",
    "TANDOORI_CHICKEN",
    "TURKEY_HAM",
  ],
  pizzaSeafoodToppings: ["ANCHOVY", "PRAWNS", "TUNA"],
};

// -----------------------------------------------------------------------------------------------------------
