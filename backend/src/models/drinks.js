import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema(
  {
    drink: { type: String, required: true },
    price: [{ drinkType: String, price: String }],
    banner: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("drinks", drinkSchema, "drinks");
