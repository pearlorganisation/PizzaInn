import express from "express";
import { deleteDrink, getAllDrink, newDrink, updateDrink } from "../controllers/drink.js";
import { upload } from "../configs/cloudinary.js";
const router = express.Router();

router.route("/").get(getAllDrink).post(upload.single("banner"), newDrink);
router.route("/:id").delete(deleteDrink).patch(upload.single("banner"), updateDrink);

export default router;
