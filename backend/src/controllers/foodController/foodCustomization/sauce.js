// ----------------------------------------------Imports----------------------------------------------
import { sauceCustomizationModel } from "../../../models/foodModels/foodCustomization/pizzaCustomization/sauce.js";
import { asyncErrorHandler } from "../../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../../utils/errors/customError.js";
// ---------------------------------------------------------------------------------------------------

// @url - /customization/?foodCategory=""
// @method - PUT
// @desc - updateCustomization - controller to update or create the food customization
export const updateSauceCustomization = asyncErrorHandler(async (req, res, next) => {
   

    const { id } = req?.params;

      const data = await sauceCustomizationModel.findByIdAndUpdate(
        id,{...req?.body}
      );

      if (!data)
        return next(new CustomError("No data found with given id!!", 400));
    


    return res.status(200).json({
      success: true,
      message: `Sauce Customization Updated Successfully`
    });
  }
);

export const createSauceCustomization = asyncErrorHandler( async(req,res,next)=>{
  
    const data = new sauceCustomizationModel({
...req?.body
  })

  await data.save()

 res.status(201).json({status:true,message:"Sauce Customization created successfully"})
  }
)

export const getSauceCustomizationPrice = asyncErrorHandler(async (req, res, next) => {
  const { sizeId } = req.query;

  const data = await sauceCustomizationModel.find();

  if (!data || data.length === 0) {
    return next(new CustomError("No data found!!", 400));
  }

  // Filter prices in each document based on the given sizeId
  const filteredData = data.map((doc) => {
    const sizeData = doc.price.filter((item) => item.size.toString() === sizeId);
    return {
      ...doc.toObject(),
      price: sizeData,
    };
  });

  res.status(200).json({
    status: true,
    message: "Sauce Customization data found successfully",
    data: filteredData,
  });
});

export const getAllSauceCustomization = asyncErrorHandler( async(req,res,next)=>{

  
  const data = await sauceCustomizationModel.find()

 
 res.status(200).json({status:true,message:"Sauce Customization data found successfully",data})
  }

)


export const deleteSauceCustomization = asyncErrorHandler( async(req,res,next)=>{
       const {id}= req?.params
    
  
 const isValidId =await sauceCustomizationModel.findByIdAndDelete(id)
 if(!isValidId){
  return next(new CustomError("No data found with given id!!", 400))
 }

 
 res.status(200).json({status:true,message:"Sauce Customization data deleted successfully"})
  }

)