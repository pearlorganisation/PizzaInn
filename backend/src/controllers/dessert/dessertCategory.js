import dessertCategory from "../../models/dessert/dessertCategory.js";
import { asyncErrorHandler } from "../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../utils/errors/customError.js";


export const newCategory = asyncErrorHandler(async (req, res, nxt) => {
  const savedCategory = new dessertCategory(req?.body);
  await savedCategory.save();
  res
    .status(200)
    .json({ status: true, message: "Dessert category created successfully!!" });
});

export const updateCategory = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;

  const data = await dessertCategory.findByIdAndUpdate(id,req?.body)
  if(!data){
return next ( new CustomError("This Id Doesn't exist",400) )
  }

  res.status(200).json({status:true,message:"Dessert Updated Successfully",data})
})

export const deleteCategory = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  
  const data = await dessertCategory.findByIdAndDelete(id)

  if(!data){
    return next ( new CustomError("This Id Doesn't exist",400) )
    }

  res.status(200).json({status:true,message:"Dessert Deleted Successfully"})
})


export const getAllCategory = asyncErrorHandler(async (req, res, next) => {
  const data = await dessertCategory.find();
  res.status(200).json({ status: true, data });
});
