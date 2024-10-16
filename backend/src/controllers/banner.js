import banner from "../models/banner.js";
import { asyncErrorHandler } from "../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../utils/errors/customError.js";
import mongoose from "mongoose"

export const newbanner = asyncErrorHandler(async (req, res, next) => {
  const { deal } = req?.body;

  await banner.create({
    banner: req?.file?.path,
    deal
  });
  res
    .status(201)
    .json({ status: true, message: "New Banner created successfully!!" });
});


export const updateBanner = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const { deal } = req.body;

    console.log(id)
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(id)
        return next(new CustomError("Invalid ID format", 400));
    }

    // Find existing data
    const existingData = await banner.findById(id); // Find the document to check if it exists
    if (!existingData) {
        return next(new CustomError("This Id Doesn't exist", 400));
    }

    // Update the banner
    const updatedData = await banner.findByIdAndUpdate(id, {
        banner: req.file?.path || existingData.banner, // Use existing banner if no new file uploaded
        deal,
    }, { new: true }); // { new: true } returns the updated document

    res.status(200).json({ success: true, message: "Banner Updated Successfully", data: updatedData });
});


export const deleteBanner = asyncErrorHandler(async(req,res,next)=>{
  const {id}= req?.params;
  
  const data = await banner.findByIdAndDelete(id)

  if(!data){
    return next ( new CustomError("This Id Doesn't exist",400) )
    }

  res.status(200).json({status:true,message:"Banner Deleted Successfully"})
})


export const getAllBanners = asyncErrorHandler(async (req, res, next) => {
  const data = await banner.find().populate("deal");
  res.status(200).json({ status: true, data });
});
