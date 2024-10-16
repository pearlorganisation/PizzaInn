import mongoose, { Mongoose } from "mongoose";

const sidesfilterSchema = new mongoose.Schema(
  {
    filter: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("sidesFilter", sidesfilterSchema, "sidesFilter");





