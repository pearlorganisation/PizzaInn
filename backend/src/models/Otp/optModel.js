import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: [true, "enter the otp"],
    },
    type: {
      type: String,
      default: "SIGNUP",
      enum: ["FORGOTPASSWORD", "SIGNUP"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    expireAfterSeconds: 300,
  }
);

export default mongoose.model("otp", otpSchema, "otp");
