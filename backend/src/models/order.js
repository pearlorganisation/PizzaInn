import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderType: {
      type: String,
      enum: ["delivery", "collection"],
      required: [true, "orderType is required!"],
    },
    orderNumber:{
      type:String
    },
    address: {
      type: {}
    },
    time: {
      type: String,
      required: [true, "time is required!"],
    },
    totalAmount: {
      type: {},
    },
    orderBy: {
      type: mongoose.Types.ObjectId,
      ref: "auth",
      required: [true, "orderBy is required!"],
    },
    orderStatus: {
      type: String,
      enum:["Pending","Completed","Cancelled"],
      default:"Pending"
    },
    items: {
      type: [],
      required: [true, "items are required"],
    },
    comment: {
      type: String,
    },
    paymentMethode: {
      type: String,
    },
    paymentStatus:{
      type:Boolean
    },
    orderCode:{
      type:String
    }

  },
  { timestamps: true }
);

orderSchema.methods.calculateTotalPrice = function () {
  let totalPrice = 0;

  // Calculate total price for pizza
  this.pizza.forEach((item) => {
    totalPrice += item.size.price;
    totalPrice += item.base.price;
    item.customization.forEach((custom) => {
      totalPrice += custom.price;
    });
  });

  // Calculate total price for drinks
  this.drink.forEach((drink) => {
    totalPrice += drink.price;
  });

  // Calculate total price for dips
  this.dips.forEach((dip) => {
    totalPrice += dip.price;
  });

  // Calculate total price for sides
  this.sides.forEach((side) => {
    totalPrice += side.price;
  });

  // Calculate total price for desserts
  this.dessert.forEach((dessert) => {
    totalPrice += dessert.price;
  });

  // Update the totalAmount field in the document
  this.totalAmount = totalPrice;
};

export default mongoose.model("order", orderSchema);
