
import { upload } from "../../configs/cloudinary.js";
import dessert from "../../models/dessert/dessert.js";
import { asyncErrorHandler } from "../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../utils/errors/customError.js";

export const newDessert = asyncErrorHandler(async (req, res, next) => {
  console.log(typeof req?.body?.price)
  const savedData = new dessert({
    ...req?.body,
    banner: req?.file?.path
  });
  await savedData.save();
  res.status(201).json({ status: true, message: "Created Dessert successfully!!" });
});

export const updateDessert = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
const existingData = await dessert.find();

  const data = await dessert.findByIdAndUpdate(id,{
    ...req?.body,
    banner: req?.file?.path || existingData?.banner,
  })
  if(!data){
return next ( new CustomError("This Id Doesn't exist",400) )
  }

  res.status(200).json({status:true,message:"Dessert Updated Successfully"})
})

export const deleteDessert = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  
  const data = await dessert.findByIdAndDelete(id)

  if(!data){
    return next ( new CustomError("This Id Doesn't exist",400) )
    }

  res.status(200).json({status:true,message:"Dessert Deleted Successfully"})
})

export const getAllDesserts = asyncErrorHandler(async (req, res, next) => {
  const data = await dessert.find().populate("category").populate("filter");
  res.status(200).json({ status: true, data });
});
