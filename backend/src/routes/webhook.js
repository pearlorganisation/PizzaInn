import express from "express";
import { transactionCreatedWebHook, webhookResponse } from "../controllers/order.js";


const router = express.Router();

router.route("/transactionCreatedWebhook").get(transactionCreatedWebHook).post(webhookResponse)


export default router;



