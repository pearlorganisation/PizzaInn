// ----------------------------------------------Imports----------------------------------------------
import { vegetarianToppingsCustomizationModel } from "../../../models/foodModels/foodCustomization/pizzaCustomization/vegetarianToppings.js";
import { asyncErrorHandler } from "../../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../../utils/errors/customError.js";
// ---------------------------------------------------------------------------------------------------

// @url - /customization/?foodCategory=""
// @method - PUT
// @desc - updateCustomization - controller to update or create the food customization
export const updateVegetarianToppingsCustomization = asyncErrorHandler(async (req, res, next) => {
   

    const { id } = req?.params;

      const data = await vegetarianToppingsCustomizationModel.findByIdAndUpdate(
        id,{...req?.body}
      );

      if (!data)
        return next(new CustomError("No data found with given id!!", 400));
    


    return res.status(200).json({
      success: true,
      message: `VegetarianToppings Customization Updated Successfully`
    });
  }
);

export const createVegetarianToppingsCustomization = asyncErrorHandler( async(req,res,next)=>{
  
    const data = new vegetarianToppingsCustomizationModel({
...req?.body
  })

  await data.save()


 res.status(201).json({status:true,message:"VegetarianToppings Customization created successfully"})
  }
)

export const getVegetarianToppingsCustomizationPrice = asyncErrorHandler(async (req, res, next) => {
  const { sizeId } = req.query;

  const data = await vegetarianToppingsCustomizationModel.find();

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
    message: "VegetarianToppings Customization data found successfully",
    data: filteredData,
  });
});

export const getAllVegetarianToppingsCustomization = asyncErrorHandler( async(req,res,next)=>{

  
  const data = await vegetarianToppingsCustomizationModel.find()

 
 res.status(200).json({status:true,message:"VegetarianToppings Customization data found successfully",data})
  }

)

export const deleteVegetarianToppingsCustomization = asyncErrorHandler( async(req,res,next)=>{
  const {id}= req?.params


const isValidId =await vegetarianToppingsCustomizationModel.findByIdAndDelete(id)
if(!isValidId){
return next(new CustomError("No data found with given id!!", 400))
}



res.status(200).json({status:true,message:"VegetarianToppings Customization data deleted successfully"})
}

)