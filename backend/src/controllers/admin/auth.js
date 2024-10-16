import { admin } from "../../models/admin/auth.js";
import { asyncErrorHandler } from "../../utils/errors/asyncErrorHandler.js";
import bcrypt from "bcrypt";

// -------------------admin signup-------------------------
export const adminSignup = asyncErrorHandler(async (req, res) => {
  const { email, password } = req?.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new admin({
    email,
    password: hashedPassword,
  });
  newAdmin.save();
  res.status(201).send("success");
});
