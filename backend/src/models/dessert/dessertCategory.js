import mongoose from "mongoose";

const dessertCategorySchema = new mongoose.Schema(
  {
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model(
  "dessertCategory",
  dessertCategorySchema,
  "dessertCategory"
);
