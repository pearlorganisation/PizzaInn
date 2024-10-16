// ---------------------------------------------Imports----------------------------------------------------
import express from "express";
import { createSizeCustomization, deleteSizeCustomization, getAllSizeCustomization, updateSizeCustomization } from "../../../controllers/foodController/foodCustomization/size.js";
// --------------------------------------------------------------------------------------------------------

export const sizeCustomizationRouter = express.Router();

sizeCustomizationRouter.route("/:id").patch(updateSizeCustomization).delete(deleteSizeCustomization);

sizeCustomizationRouter.route("/").get(getAllSizeCustomization).post(createSizeCustomization);;
