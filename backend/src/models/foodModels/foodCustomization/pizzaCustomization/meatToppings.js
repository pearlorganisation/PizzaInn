// -------------------------------------------Imports------------------------------------------------------
import mongoose from "mongoose";
// ----------------------------------------------------------------------------------------------------------

const meatToppingsCustomizationSchema = new mongoose.Schema({
 
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
meatToppingsCustomizationModel = mongoose.model(
  "meatToppings_Customization",
  meatToppingsCustomizationSchema
);





