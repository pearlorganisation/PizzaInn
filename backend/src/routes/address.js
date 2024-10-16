import express from "express";
import { deleteAddress, getParticularUserAddress, newAddress, updateAddress } from "../controllers/address.js";

const router = express.Router()

router.route("/").post(newAddress);
router.route("/:id").patch(updateAddress).delete(deleteAddress)
router.route("/:userId").get(getParticularUserAddress)

export default router