// ----------------------------------------------Imports----------------------------------------------
import { sizeCustomizationModel } from "../../../models/foodModels/foodCustomization/pizzaCustomization/size.js";
import { asyncErrorHandler } from "../../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../../utils/errors/customError.js";
// ---------------------------------------------------------------------------------------------------

// @url - /customization/?foodCategory=""
// @method - PUT
// @desc - updateCustomization - controller to update or create the food customization
export const updateSizeCustomization = asyncErrorHandler(async (req, res, next) => {
   

    const { id } = req?.params;

      const data = await sizeCustomizationModel.findByIdAndUpdate(
        id,{...req?.body}
      );

      if (!data)
        return next(new CustomError("No data found with given id!!", 400));
   

    return res.status(200).json({
      success: true,
      message: `Size Customization Updated Successfully`,

    });
  }
);

export const createSizeCustomization = asyncErrorHandler( async(req,res,next)=>{
  
    const data = new sizeCustomizationModel({
...req?.body
  })

  await data.save()


 res.status(201).json({status:true,message:"Size Customization created successfully"})
  }
)

export const getAllSizeCustomization = asyncErrorHandler( async(req,res,next)=>{

  
  const data = await sizeCustomizationModel.find()

 
 res.status(200).json({status:true,message:"Size Customization data found successfully",data})
  }

)

export const deleteSizeCustomization = asyncErrorHandler( async(req,res,next)=>{
  const {id}= req?.params

const isValidId =await sizeCustomizationModel.findByIdAndDelete(id)
if(!isValidId){
return next(new CustomError("No data found with given id!!", 400))
}



res.status(200).json({status:true,message:"Size Customization data deleted successfully"})
}

)