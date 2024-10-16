// ----------------------------------------------Imports----------------------------------------------
import { baseCustomizationModel } from "../../../models/foodModels/foodCustomization/pizzaCustomization/base.js";
import { asyncErrorHandler } from "../../../utils/errors/asyncErrorHandler.js";
import { CustomError } from "../../../utils/errors/customError.js";
// ---------------------------------------------------------------------------------------------------

// @url - /customization/?foodCategory=""
// @method - PUT
// @desc - updateCustomization - controller to update or create the food customization
export const updateBaseCustomization = asyncErrorHandler(async (req, res, next) => {
   

    const { id } = req?.params;

      const data = await baseCustomizationModel.findByIdAndUpdate(
        id,{...req?.body},{new:true}
      );

    

      if (!data)
        return next(new CustomError("No data found with given id!!", 400));


      return res.status(200).json({
      success: true,
      message: `Base Customization Updated Successfully`});
  }
);

export const createBaseCustomization = asyncErrorHandler( async(req,res,next)=>{
  // const {price,name} = req?.body
  // const priceWithName = price.map(item => ({
  //   ...item,
  //   name: name // Add the main name to the nested name field
  // }));

    const data = new baseCustomizationModel({
...req?.body
  })

  await data.save()
  

 res.status(201).json({status:true,message:"Base Customization created successfully"})
  }
)

export const getBaseCustomizationPrice = asyncErrorHandler(async (req, res, next) => {
  const { sizeId } = req.query;

  const data = await baseCustomizationModel.find();

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
    message: "Base Customization data found successfully",
    data: filteredData,
  });
});

export const getAllBaseCustomization = asyncErrorHandler( async(req,res,next)=>{


const data = await baseCustomizationModel.find()

 res.status(200).json({status:true,message:"Base Customization data found successfully",data})
  }

)

export const deleteBaseCustomization = asyncErrorHandler( async(req,res,next)=>{
       const {id}= req?.params

       
       const isValidId =await baseCustomizationModel.findByIdAndDelete(id)
       if(!isValidId){
         return next(new CustomError("No data found with given id!!", 400))
         }
 res.status(200).json( {status:true,message:"Base Customization data deleted successfully"})

  

  }

)