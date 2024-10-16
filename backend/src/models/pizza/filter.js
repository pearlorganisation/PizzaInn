import mongoose, { Mongoose } from "mongoose";

const pizzafilterSchema = new mongoose.Schema(
  {
    filter: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("pizzafilter", pizzafilterSchema, "pizzafilter");





