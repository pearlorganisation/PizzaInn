import express from "express";
const router = express.Router();
import { newDips,getAllDips, updateDips, deleteDips } from "../controllers/dips.js";
import { upload } from "../configs/cloudinary.js";

router.route("/").get(getAllDips).post(upload.single("banner"),newDips)
router.route("/:id").delete(deleteDips).patch(upload.single("banner"),updateDips)

export default router;
