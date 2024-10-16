import address from "../models/address.js";
import { asyncErrorHandler } from "../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../utils/errors/customError.js";

export const newAddress = asyncErrorHandler(async (req, res, next) => {
  const newAddress = await address.create(req?.body);
  res
    .status(201)
    .json({ status: true, message: "New Address created successfully" });
});

export const getParticularUserAddress = asyncErrorHandler(
  async (req, res, next) => {
    const { userId } = req?.params;
    const data = await address.find({ userId: userId });
    if (!data) {
      return next(new CustomError("User Id doesn't exist!!", 400));
    }
    res
      .status(200)
      .json({ status: true, message: "Address found successfully", data });
  }
);

export const updateAddress = asyncErrorHandler(async (req, res, next) => {
  const { id } = req?.params;
  const isValidId = await address.findByIdAndUpdate(id, req?.body);
  if (!isValidId) {
    return next(new CustomError("Id doesn't exist!!", 400));
  }

  res.status(200).json({ status: true, message: "Address Updated successfully" });
});

export const deleteAddress = asyncErrorHandler(async (req, res, next) => {
  const { id } = req?.params;
  const isValidId = await address.findByIdAndDelete(id);
  if (!isValidId) {
    return next(new CustomError("Id doesn't exist!!", 400));
  }
  res
    .status(200)
    .json({ status: true, message: "Address deleted successfully" });
});
