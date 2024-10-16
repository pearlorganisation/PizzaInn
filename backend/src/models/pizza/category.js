import mongoose, { Mongoose } from "mongoose";

const pizzaCategorySchema = new mongoose.Schema(
  {
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model(
  "pizzaCategory",
  pizzaCategorySchema,
  "pizzaCategory"
);
