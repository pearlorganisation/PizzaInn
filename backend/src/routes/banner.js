import express from "express"
import { deleteBanner, getAllBanners, newbanner, updateBanner } from "../controllers/banner.js";
import { upload } from "../configs/cloudinary.js";


const router = express.Router();

router.route("/").get(getAllBanners).post(upload.single("banner"),newbanner)
router.route("/:id").patch(upload.single("banner"),updateBanner).delete(deleteBanner)

export default router