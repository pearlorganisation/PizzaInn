import express from "express";
import { adminSignup } from "../../controllers/admin/auth.js";

const router = express.Router();

router.route("/").post(adminSignup);

export default router;
