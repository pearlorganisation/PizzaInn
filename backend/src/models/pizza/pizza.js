import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    pizzaName: {
      type: String,
      required: true,
    },
    filter: {
      type: mongoose.Types.ObjectId,
      ref: "pizzafilter",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "pizzaCategory",
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    baseName: { type: String, required: true },
    cheeseName: [String],
    sauceName: [String],
    vegetarianToppingsName: [String],
    meatToppingsName: [String],
    priceSection: [{ price: Number, size: {type:mongoose.Types.ObjectId,ref:"size_Customization"} }],
  },
  { timestamps: true }
);

export default mongoose.model("pizzas", pizzaSchema, "pizza");
