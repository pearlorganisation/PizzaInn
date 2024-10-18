// -----------------------------------------------Imports-------------------------------------------------------
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectMongo } from "./src/configs/db/mongo/mongoConfig.js";
import { envAccess } from "./src/utils/index.js";
import { CustomError } from "./src/utils/errors/customError.js";
import path from "path"

// -------------------------------------------------------------------------------------------------------------
dotenv.config();

const app = express();
const PORT = envAccess("PORT") || 9898;
connectMongo();

// ------------------------------------------------------------------------------------------------------------
// ----------------------------------------------CORS HANDLING-------------------------------------------------
app.use(
  cors(
    process.env.NODE_ENV === "production"
      ? {
          origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "https://angli-admin.vercel.app",
            "https://angliano-2-0.vercel.app"
          ],
          credentials: true,
        }
      : {
          origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
            "https://angli-admin.vercel.app",
            "https://angliano-2-0.vercel.app"
          ],
          methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
          credentials: true,
          maxAge: 600,
          exposedHeaders: ["*", "Authorization"],
        }
  )
);
// ------------------------------------------------------------------------------------------------------------
// ----------------------------------------------Middlewares----------------------------------------------------
// express.json() -- middleware to parse the json coming from the http request
app.use(express.json());

// cookieParser() -- middleware to parse the cookie coming from the http request
app.use(cookieParser());
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------Routes----------------------------------------------------

const versionOne = (url) => {
  return `/api/v1/${url}`;
};
const foodCustomization = (url) => {
  return `/api/v1/food/customization/${url}`;
};

// Router Imports
import { foodItemRouter } from "./src/routes/foodRoutes/foodItemRoutes.js";

import { baseCustomizationRouter } from "./src/routes/foodRoutes/foodCustomization/base.js";
import { sizeCustomizationRouter } from "./src/routes/foodRoutes/foodCustomization/size.js";
import { cheeseCustomizationRouter } from "./src/routes/foodRoutes/foodCustomization/cheese.js";
import { sauceCustomizationRouter } from "./src/routes/foodRoutes/foodCustomization/sauce.js";
import { meatToppingsCustomizationRouter } from "./src/routes/foodRoutes/foodCustomization/meatToppings.js";
import { vegetarianToppingsCustomizationRouter } from "./src/routes/foodRoutes/foodCustomization/vegetarianToppings.js";
import pizzaRoutes from "./src/routes/pizza/pizza.js";
import sidesRoutes from "./src/routes/sides.js";
import dessertRoutes from "./src/routes/dessert.js";
// Route Middlewares
import drinksRoutes from "./src/routes/drink.js";
import dipsRoutes from "./src/routes/dips.js";
import authRoutes from "./src/routes/authRoutes/authRoutes.js";
import adminAuth from "./src/routes/admin/auth.js";
import addressRoutes from "./src/routes/address.js";
import orderRoutes from "./src/routes/order.js";
import dealsRoutes from "./src/routes/deals/deals.js";
import webhookRoutes from "./src/routes/webhook.js";
import mailRoutes from "./src/routes/mail.js";
import bannerRoutes from "./src/routes/banner.js";


import morgan from "morgan";

app.use(morgan("dev"));
app.all(["/", "/api", "/api/v1"], (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to Hot House",
  });
});

app.use(versionOne("food"), foodItemRouter); // Food Item Router

// Food Customization Router
app.use(foodCustomization("base"), baseCustomizationRouter);
app.use(foodCustomization("size"), sizeCustomizationRouter);
app.use(foodCustomization("cheese"), cheeseCustomizationRouter);
app.use(foodCustomization("sauce"), sauceCustomizationRouter);
app.use(foodCustomization("meatToppings"), meatToppingsCustomizationRouter);
app.use(
  foodCustomization("vegetarianToppings"),
  vegetarianToppingsCustomizationRouter
);

app.use("/api/v1/pizza", pizzaRoutes);
app.use("/api/v1/sides", sidesRoutes);
app.use("/api/v1/dessert", dessertRoutes);
app.use("/api/v1/drinks", drinksRoutes);
app.use("/api/v1/dips", dipsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/auth/adminSignUp", adminAuth);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/deals", dealsRoutes);
app.use("/api/v1/webhook", webhookRoutes);
app.use("/api/v1/mail", mailRoutes);
app.use("/api/v1/banner", bannerRoutes);

// -------------------------------------------------------------------------------------------------------------

// ------------------------------------------Global Error Handling----------------------------------------------
// // Set EJS as the view engine
// app.set("view engine", "ejs");

// // Define the directory for views
// app.set("views", path.join(path.resolve(), "src/views"));

// // Define a route to render EJS pages
// app.get("/", (req, res) => {
//   res.render("orderMail", { title: "HI", message: "Hello from EJS!" , 
//       orderType: "collection",
//       name:"Avnish",
//       orderId: "250920",
//       time: "Wednesday-17:15",
//       amount: 24,
//       date:"24-10-24",
//       items: [
//         {
//           name: "Vegetarian Pizza",
//           img: "https://res.cloudinary.com/dnixhctcf/image/upload/v1724995846/zhsrnki0ikspv8gjqegc.jpg",

//           id: "6683c957888a970ed1e083416692254400cad24da6ad3291",
//           quantity: 1,
//           price: 4.99,
//           totalSum: 4.99,
//           discount: "1.00",
//           allToppings: {
//             sauce: [
//               {
//                 sauceName: "Tomato Sauce",
//                 _id: "66e93f8eb9a673a1527c9cbb",
//                 size: "single",
//                 price: 0
//               },
//               {
//                 sauceName: "Garlic Sauce",
//                 _id: "66925a4900cad24da6ad78fe",
//                 size: "double",
//                 price: 0
//               }
//             ],
//             extraPrice: "1.50",
//             totalPrice: "5.29",
//             cheese: [],
//             veg: [
//               {
//                 vegName: "Onions",
//                 _id: "6683d840f4fd704f5fe69a4a",
//                 size: "double",
//                 price: 0.6
//               },
//               {
//                 vegName: "Green Peppers",
//                 _id: "6683d8714d967210ce8111f4",
//                 size: "single",
//                 price: 0.3
//               },
//               {
//                 vegName: "Mushrooms",
//                 _id: "6683d8a14d967210ce8111f6",
//                 size: "single",
//                 price: 0.3
//               },
//               {
//                 vegName: "Sweet Corns",
//                 _id: "6683d8ac4d967210ce8111f7",
//                 size: "single",
//                 price: 0.3
//               }
//             ],
//             meat: [],
//             price: 4.99,
//             size: {
//               _id: "6683c957888a970ed1e08341",
//             name: "7\"",
//               __v: 0
//             },
//             _id: "66ed479045ced5c6a7f983a7",
//             base: {
//               _id: "6683cefc888a970ed1e0838d",
//               name: "Deep Pan",
//               price: [
//                 {
//                   size: "6683c957888a970ed1e08341",
//                   price: 0,
//                   _id: "66e7f14827032f47a5a3bb62"
//                 }
//               ],
//               __v: 0
//             }
//           }
//         },
//         {
//           name: "Vegetarian Hot Pizza",
//           img: "https://res.cloudinary.com/dnixhctcf/image/upload/v1724995867/wsdlxobq8dggnrqta0az.jpg",
//           id: "66ed47a345ced5c6a7f985c9a54fdo66ed47a345ced5c6a7f985c99cbbsi66ed47a345ced5c6a7f985c978d5do66ed47a345ced5c6a7f985c99a4asi66ed47a345ced5c6a7f985c911f4si66ed47a345ced5c6a7f985c911f5si66ed47a345ced5c6a7f985c911f8si66ed47a345ced5c6a7f985c9838dundefined66ed47a345ced5c6a7f985c98341undefined",
//           quantity: 1,
//           price: "5.29",
//           totalSum: "5.29",
//           discount: "1.06",
      
//         },
//         {
//           name: "The Big Eater Deal",
//           img: "https://res.cloudinary.com/durqwvafr/image/upload/v1722341719/fzcgachlfs4fkltzekem.webp",
//           id: "669f77aeaed590855e1a589b66921e5000cad24da6ad2829",
//           quantity: 1,
//           price: "17.99",
//           totalSum: "17.99",
     
//         },
//         {
//           name: "Curly Deal",
//           img: "https://res.cloudinary.com/durqwvafr/image/upload/v1722487678/ykrjalwsgvue6ndmsahl.webp",
//           id: "66a0aaaa7046a6fabdd0906f6692254400cad24da6ad3291a54fdo9cbbsi78b5do9a4asi11f4si11f6si11f7si838dundefined834aundefined",
//           size:"7\"",
//           quantity: 1,
//           price: "20.99",
//           totalSum: "20.99",
//           dealsData: [
//             {
//               label: "Vegetarian Pizza",
//               value: "6692254400cad24da6ad3291",
//               id: "6692254400cad24da6ad3291a54fdo9cbbsi78b5do9a4asi11f4si11f6si11f7si838dundefined834aundefined",
//               banner: "https://res.cloudinary.com/dnixhctcf/image/upload/v1724995846/zhsrnki0ikspv8gjqegc.jpg",
         
//               sauceName: [
//                 {
//                   sauceName: "Tomato Sauce",
//                   _id: "66e93f8eb9a673a1527c9cbb",
//                   size: "single",
//                   price: 0
//                 },
//                 {
//                   sauceName: "Manchurian Sauce",
//                   _id: "6692599000cad24da6ad78b5",
//                   size: "double",
//                   price: 0
//                 }
//               ],
//               cheeseName: [
//                 {
//                   cheeseName: "Less Cheese",
//                   _id: "66a8d37ff16f0b33c535a54f",
//                   size: "double",
//                   price: 1
//                 }
//               ],
//               vegetarianToppingsName: [
//                 {
//                   vegName: "Onions",
//                   _id: "6683d840f4fd704f5fe69a4a",
//                   size: "single",
//                   price: 1
//                 },
//                 {
//                   vegName: "Green Peppers",
//                   _id: "6683d8714d967210ce8111f4",
//                   size: "single",
//                   price: 1
//                 },
//                 {
//                   vegName: "Mushrooms",
//                   _id: "6683d8a14d967210ce8111f6",
//                   size: "single",
//                   price: 1
//                 },
//                 {
//                   vegName: "Sweet Corns",
//                   _id: "6683d8ac4d967210ce8111f7",
//                   size: "single",
//                   price: 1
//                 }
//               ],
//               meatToppingsName: [],
//               baseName: {
//                 _id: "6683cefc888a970ed1e0838d",
//                 name: "Deep Pan",
//                 price: [
//                   {
//                     size: "6683c971888a970ed1e0834a",
//                     price: 0,
//                     _id: "66e7f14827032f47a5a3bb65"
//                   }
//                 ],
//                 __v: 0
//               },
//               name: "Vegetarian Pizza",
//               pizzaPrice: 15.99,
//               pizzaExtraToppingPrice: 1
//             },
//             {
//               label: "Pepsi",
//               value: "667027753a3495a561c3e324"
//             },
//             {
//               label: "Pepsi Max",
//               value: "66ebe2c19f1b22e164ed47e5"
//             },
//             {
//               label: "1 Large Curly Fries"
//             }
//           ]
//         },
//         {
//           name: "Garlic Bread With Cheese 4 pcs",
//           img: "https://res.cloudinary.com/dnixhctcf/image/upload/v1726585921/rfjigo9ub6a065zqng5p.jpg",
//           size: 3,
//           id: "66e7e96eeaadc8e16fa5e570",
//           quantity: 1,
//           price: 3,
//           totalSum: 3
//         },
//         {
//           id: "66ebe2c19f1b22e164ed47e566ebe2c19f1b22e164ed47e6",
//           name: "Pepsi Max",
//           img: "https://res.cloudinary.com/dnixhctcf/image/upload/v1726735041/hynpe6u5ae2bwktrexeq.png",
//           size: "Bottle-3.5",
//           quantity: 1,
//           price: "3.50",
//           totalSum: "3.50"
//         },
//         {
//           name: "Ben & Jerry's 500ml",
//           img: "https://res.cloudinary.com/dnixhctcf/image/upload/v1726735299/hm09elrtnsvotfcelouv.jpg",
//           size: 8.35,
//           id: "6672a29588588b02dd7e46fa",
//           quantity: 1,
//           price: 8.35,
//           totalSum: 8.35
//         },
//         {
//           name: "Garlic & Herb",
//           img: "https://res.cloudinary.com/dnixhctcf/image/upload/v1726720602/oii1oi699tqamrhsf9ut.jpg",
//           size: "Small-0.3",
//           id: "66e811e3eaadc8e16fa64f07",
//           quantity: 1,
//           price: 0.3,
//           totalSum: 0.3
//         }
//       ],
//       paymentType: "Cash on delivery"
//     ,
    
//     email: "avnish@pearlorganisation.com"
//    });
// });

app.all("*", (req, res, next) => {
  return next(
    new CustomError(`Can't find the ${req.originalUrl} on the server`, 404)
  );
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: error.message,
  });
});

// ------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running at port - ${PORT}`);
});
// ------------------------------------------------------------------------------------------------------------
