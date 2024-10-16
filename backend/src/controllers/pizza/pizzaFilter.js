import { asyncErrorHandler } from "../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../utils/errors/customError.js";

import filter from "../../models/pizza/filter.js";

export const newFilter = asyncErrorHandler(async (req, res, nxt) => {
  const savedFilter = new filter(req?.body);
  await savedFilter.save();
  res
    .status(200)
    .json({ status: true, message: "Pizza filter created successfully!!" });
});

export const updateFilter = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;

  const data = await filter.findByIdAndUpdate(id,req?.body)
  if(!data){
return next ( new CustomError("This Id Doesn't exist",400) )
  }

  res.status(200).json({status:true,message:"Dessert Updated Successfully"})
})

export const deleteFilter = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  
  const data = await filter.findByIdAndDelete(id)

  if(!data){
    return next ( new CustomError("This Id Doesn't exist",400) )
    }

  res.status(200).json({status:true,message:"Dessert Deleted Successfully"})
})


export const getAllFilter = asyncErrorHandler(async (req, res, next) => {
  const data = await filter.find();
  const newData = [{ filter: "All" }, ...data];
  res.status(200).json({ status: true, data: newData });
});
