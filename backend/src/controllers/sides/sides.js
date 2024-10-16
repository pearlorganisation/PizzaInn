import sides from "../../models/sides/sides.js";
import { upload } from "../../configs/cloudinary.js";
import { asyncErrorHandler } from "../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../utils/errors/customError.js";

export const newSides = asyncErrorHandler(async (req, res, next) => {
  const savedData = new sides({
    ...req?.body,
    banner: req?.file?.path,
  });
  await savedData.save();
  res.status(201).json({ status: true, message: "Created successfully!!" });
});

export const updateSides = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
const existingData = await sides.find();

  const data = await sides.findByIdAndUpdate(id,{
    ...req?.body,
    banner: req?.file?.path || existingData?.banner,
  })
  if(!data){
return next ( new CustomError("This Id Doesn't exist",400) )
  }

  res.status(200).json({status:true,message:"Sides Updated Successfully"})
})

export const deleteSides = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  
  const data = await sides.findByIdAndDelete(id)

  if(!data){
    return next ( new CustomError("This Id Doesn't exist",400) )
    }

  res.status(200).json({status:true,message:"Sides Deleted Successfully"})
})


export const getAllSides = asyncErrorHandler(async (req, res, next) => {
  const data = await sides.find().populate("category").populate("filter");
  res.status(200).json({ status: true, data });
});
