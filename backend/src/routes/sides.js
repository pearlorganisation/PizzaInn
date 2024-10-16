import express from "express";
import { upload } from "../configs/cloudinary.js";
import { deleteSides, getAllSides, newSides, updateSides } from "../controllers/sides/sides.js";
import {
  deleteCategory,
  getAllCategory,
  newCategory,
  updateCategory,
} from "../controllers/sides/sidesCategory.js";
import { deleteFilter, getAllSidesFilter, newFilter, updateFilter } from "../controllers/sides/sidesFilter.js";

const router = express.Router();

//sides
router.route("/").get(getAllSides).post(upload.single("banner"), newSides);
router.route("/:id").patch(upload.single("banner"), updateSides).delete(deleteSides);

//category
router.route("/category").get(getAllCategory).post(newCategory);
router.route("/category/:id").delete(deleteCategory).patch(updateCategory);

//filter
router.route("/filter").get(getAllSidesFilter).post(newFilter)
router.route("/filter/:id").delete(deleteFilter).patch(updateFilter);

export default router;
