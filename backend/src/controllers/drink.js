import { asyncErrorHandler } from "../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../utils/errors/customError.js";
import drinks from "../models/drinks.js";

export const newDrink = asyncErrorHandler(async (req, res, next) => {
  const { price, drink } = req?.body;
  const newDrinkData = await drinks.create({
    banner: req?.file?.path,
    price: JSON.parse(price),
    drink,
  });
  res
    .status(201)
    .json({ status: true, message: "New drink created successfully!!" });
});

export const updateDrink = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  const { price, drink } = req?.body;
const existingData = await drinks.find();

  const data = await drinks.findByIdAndUpdate(id,{
    banner: req?.file?.path || existingData?.banner,
    price: JSON.parse(price),
    drink
  })
  if(!data){
return next ( new CustomError("This Id Doesn't exist",400) )
  }

  res.status(200).json({status:true,message:"Drink Updated Successfully"})
})

export const deleteDrink = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  
  const data = await drinks.findByIdAndDelete(id)

  if(!data){
    return next ( new CustomError("This Id Doesn't exist",400) )
    }

  res.status(200).json({status:true,message:"Drink Deleted Successfully"})
})

export const getAllDrink = asyncErrorHandler(async (req, res, next) => {
  const data = await drinks.find();
  res.status(200).json({ status: true, data });
});
