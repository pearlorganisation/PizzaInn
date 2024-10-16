// ---------------------------------------------Imports----------------------------------------------------
import express from "express";
import { createVegetarianToppingsCustomization, deleteVegetarianToppingsCustomization, getAllVegetarianToppingsCustomization, getVegetarianToppingsCustomizationPrice, updateVegetarianToppingsCustomization } from "../../../controllers/foodController/foodCustomization/vegetarianToppings.js";
// --------------------------------------------------------------------------------------------------------

export const vegetarianToppingsCustomizationRouter = express.Router();

vegetarianToppingsCustomizationRouter.route("/:id").patch(updateVegetarianToppingsCustomization).delete(deleteVegetarianToppingsCustomization);

vegetarianToppingsCustomizationRouter.route("/").get(getAllVegetarianToppingsCustomization).post(createVegetarianToppingsCustomization);

vegetarianToppingsCustomizationRouter.route("/price").get(getVegetarianToppingsCustomizationPrice)
