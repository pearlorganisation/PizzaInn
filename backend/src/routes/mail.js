import express from "express";
import { OrderMail } from "../controllers/mail.js";


const router = express.Router();

router.route("/").post(OrderMail);


export default router;
