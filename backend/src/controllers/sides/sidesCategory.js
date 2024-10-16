import { asyncErrorHandler } from "../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../utils/errors/customError.js";
import sidesCategory from "../../models/sides/sidesCategory.js";

export const newCategory = asyncErrorHandler(async (req, res, nxt) => {
  const savedCategory = new sidesCategory(req?.body);
  await savedCategory.save();
  res
    .status(200)
    .json({ status: true, message: "Sides category created successfully!!" });
});

export const updateCategory = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;

  const data = await sidesCategory.findByIdAndUpdate(id,req?.body)
  if(!data){
return next ( new CustomError("This Id Doesn't exist",400) )
  }

  res.status(200).json({status:true,message:"Dessert Updated Successfully"})
})

export const deleteCategory = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  
  const data = await sidesCategory.findByIdAndDelete(id)

  if(!data){
    return next ( new CustomError("This Id Doesn't exist",400) )
    }

  res.status(200).json({status:true,message:"Dessert Deleted Successfully"})
})


export const getAllCategory = asyncErrorHandler(async (req, res, next) => {
  const data = await sidesCategory.find();
  res.status(200).json({ status: true, data });
});
