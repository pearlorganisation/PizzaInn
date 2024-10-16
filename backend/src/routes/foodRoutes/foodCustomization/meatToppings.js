// ---------------------------------------------Imports----------------------------------------------------
import express from "express";
import { createMeatToppingsCustomization, deleteMeatToppingsCustomization, getAllMeatToppingsCustomization, getMeatToppingsCustomizationPrice, updateMeatToppingsCustomization } from "../../../controllers/foodController/foodCustomization/meatToppings.js";
// --------------------------------------------------------------------------------------------------------

export const meatToppingsCustomizationRouter = express.Router();

meatToppingsCustomizationRouter.route("/:id").patch(updateMeatToppingsCustomization).delete(deleteMeatToppingsCustomization);

meatToppingsCustomizationRouter.route("/").get(getAllMeatToppingsCustomization).post(createMeatToppingsCustomization);

meatToppingsCustomizationRouter.route("/price").get(getMeatToppingsCustomizationPrice)
