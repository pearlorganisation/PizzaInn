import { asyncErrorHandler } from "../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../utils/errors/customError.js";
import pizza from "../../models/pizza/pizza.js";

export const createNewPizza = asyncErrorHandler(async (req, res, next) => {
  const { priceSection } = req?.body;

  const newPizza = new pizza({
    ...req?.body,
    banner: req?.file?.path,
    priceSection: JSON.parse(priceSection),
  });

  await newPizza.save();
  res
    .status(200)
    .json({ status: true, message: "Pizza created successfully!!", newPizza });
});

export const updatePizza = asyncErrorHandler(async (req, res, next) => {
  const { id } = req?.params;
  const { priceSection } = req?.body;
  console.log(typeof JSON.parse(priceSection)[0].price);
  const existingData = await pizza.find();

  const data = await pizza.findByIdAndUpdate(id, {
    ...req?.body,
    banner: req?.file?.path || existingData?.banner,
    priceSection: JSON.parse(priceSection),
  });
  if (!data) {
    return next(new CustomError("This Id Doesn't exist", 400));
  }

  res.status(200).json({ status: true, message: "Pizza Updated Successfully" });
});

export const deletePizza = asyncErrorHandler(async (req, res, next) => {
  const { id } = req?.params;

  const data = await pizza.findByIdAndDelete(id);

  if (!data) {
    return next(new CustomError("This Id Doesn't exist", 400));
  }

  res.status(200).json({ status: true, message: "Pizza Deleted Successfully" });
});

export const getAllPizza = asyncErrorHandler(async (req, res, next) => {
  const data = await pizza
    .find()
    .populate("category")
    .populate("filter")
    .populate("priceSection.size");
  res.status(200).json({ status: true, data });
});
