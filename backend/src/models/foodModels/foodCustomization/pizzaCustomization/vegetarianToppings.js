// -------------------------------------------Imports------------------------------------------------------
import mongoose from "mongoose";
// ----------------------------------------------------------------------------------------------------------

const vegetarianToppingsCustomizationSchema = new mongoose.Schema({
 
      name: {
        type: String,
        required: [true, "Sauce Name is a required field"],
      },
      price:[{
        size:
        {type:mongoose.Types.ObjectId,
          ref:"size_Customization"
        },
        singlePrice:Number,
        doublePrice:Number
      }],
 
});

export const 
vegetarianToppingsCustomizationModel = mongoose.model(
  "vegetarianToppings_Customization",
  vegetarianToppingsCustomizationSchema
);





