import { asyncErrorHandler } from "../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../utils/errors/customError.js";
import dipsModel from "../models/dips.js";
export const newDips = asyncErrorHandler(async (req, res, next) => {
  const { price,dips } = req?.body;
  const newDipData = await dipsModel.create({
    banner: req?.file?.path,
    price: JSON.parse(price),
    dips
  });
  res
    .status(201)
    .json({ status: true, message: "New dips created successfully!!" });
});

export const updateDips = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  const { price,dips} = req?.body;
const existingData = await dipsModel.find();

  const data = await dipsModel.findByIdAndUpdate(id,{
    price: JSON.parse(price),
    banner: req?.file?.path || existingData?.banner,
    dips,
  })
  if(!data){
return next ( new CustomError("This Id Doesn't exist",400) )
  }

  res.status(200).json({status:true,message:"Dips Updated Successfully"})
})

export const deleteDips = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  
  const data = await dipsModel.findByIdAndDelete(id)

  if(!data){
    return next ( new CustomError("This Id Doesn't exist",400) )
    }

  res.status(200).json({status:true,message:"Dips Deleted Successfully"})
})


export const getAllDips = asyncErrorHandler(async (req, res, next) => {
  const data = await dipsModel.find();
  res.status(200).json({ status: true, data });
});
