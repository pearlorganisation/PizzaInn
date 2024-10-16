import mongoose, { Mongoose } from "mongoose";

const sidesCategorySchema = new mongoose.Schema(
  {
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model(
  "sidesCategory",
  sidesCategorySchema,
  "sidesCategory"
);
