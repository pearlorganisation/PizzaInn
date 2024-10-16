import mongoose from "mongoose";

const dessertfilterSchema = new mongoose.Schema(
  {
    filter: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("dessertFilter", dessertfilterSchema, "dessertFilter");





