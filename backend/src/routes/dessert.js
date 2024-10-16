import express from "express";
import { upload } from "../configs/cloudinary.js";
import { deleteDessert, getAllDesserts, newDessert, updateDessert } from "../controllers/dessert/dessert.js";
import { deleteCategory, getAllCategory, newCategory, updateCategory } from "../controllers/dessert/dessertCategory.js";
import {deleteFilter, getAllDessertFilter,newFilter, updateFilter} from "../controllers/dessert/dessertFilter.js"

const router = express.Router();

//dessert
router.route("/").get(getAllDesserts).post(upload.single("banner"), newDessert);
router.route("/:id").patch(upload.single("banner"), updateDessert).delete(deleteDessert);

//category
router.route("/category").get(getAllCategory).post(newCategory);
router.route("/category/:id").delete(deleteCategory).patch(updateCategory);


//filter
router.route("/filter").get(getAllDessertFilter).post(newFilter)
router.route("/filter/:id").delete(deleteFilter).patch(updateFilter);

export default router;
