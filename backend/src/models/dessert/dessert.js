import mongoose from "mongoose";

const dessertSchema = new mongoose.Schema(
  {
    dessertName: { type: String, required: true },
    banner: { type: String, required: true },
    price:  { type: Number, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "dessertCategory",
      required: true,
    },
    filter: {
      type: mongoose.Types.ObjectId,
      ref: "dessertFilter",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("dessert", dessertSchema, "dessert");
