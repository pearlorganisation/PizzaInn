import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    mobileNumber: {
      type: String,
      required:[ true,"Mobile Number is required"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("auth", authSchema, "auth");
