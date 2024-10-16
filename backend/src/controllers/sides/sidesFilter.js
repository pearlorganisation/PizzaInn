import { asyncErrorHandler } from "../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../utils/errors/customError.js";
import sidesFilter from "../../models/sides/sidesFilter.js";

export const newFilter = asyncErrorHandler(async (req, res, nxt) => {
  const savedFilter = new sidesFilter(req?.body);
  await savedFilter.save();
  res
    .status(200)
    .json({ status: true, message: "Sides filter created successfully!!" });
});

export const updateFilter = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;

  const data = await sidesFilter.findByIdAndUpdate(id,req?.body)
  if(!data){
return next ( new CustomError("This Id Doesn't exist",400) )
  }

  res.status(200).json({status:true,message:"Dessert Updated Successfully"})
})

export const deleteFilter = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  
  const data = await sidesFilter.findByIdAndDelete(id)

  if(!data){
    return next ( new CustomError("This Id Doesn't exist",400) )
    }

  res.status(200).json({status:true,message:"Dessert Deleted Successfully"})
})


export const getAllSidesFilter = asyncErrorHandler(async (req, res, next) => {
  const data = await sidesFilter.find();


  const newData = [{ filter: "All" }, ...data];
  res.status(200).json({ status: true, data: newData });


});
