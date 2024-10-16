import mongoose from "mongoose";

const dipsSchema = new mongoose.Schema(
  {
    dips: { type: String, required: true },
    price: [{ dipsType: String, price: String }],
    banner: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("dips", dipsSchema, "dips");
