import express from "express";
const router = express.Router();
import { upload } from "../../configs/cloudinary.js";
import { createNewPizza, deletePizza, getAllPizza, updatePizza } from "../../controllers/pizza/pizza.js";
import { deleteCategory, getAllCategory, newCategory, updateCategory } from "../../controllers/pizza/pizzaCategory.js";
import { deleteFilter, getAllFilter, newFilter, updateFilter } from "../../controllers/pizza/pizzaFilter.js";

//pizza
router.route("/").get(getAllPizza).post(upload.single("banner"), createNewPizza);
router.route("/:id").patch(upload.single("banner"), updatePizza).delete(deletePizza);

//category
router.route("/category").get(getAllCategory).post(newCategory);
router.route("/category/:id").delete(deleteCategory).patch(updateCategory);


//filter
router.route("/filter").get(getAllFilter).post(newFilter)
router.route("/filter/:id").delete(deleteFilter).patch(updateFilter);

export default router;