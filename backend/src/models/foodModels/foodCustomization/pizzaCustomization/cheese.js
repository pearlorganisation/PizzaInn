// -------------------------------------------Imports------------------------------------------------------
import mongoose from "mongoose";
// ----------------------------------------------------------------------------------------------------------

const cheeseCustomizationSchema = new mongoose.Schema({
 
      name: {
        type: String,
        required: [true, "Cheese Name is a required field"],
      },
      price:[{
      size:
      {type:mongoose.Types.ObjectId,
        ref:"size_Customization"
      },
      singlePrice:Number,
      doublePrice:Number,
      singlePriceCYOP:Number,
      doublePriceCYOP:Number
    }],
    }
);

export const 
cheeseCustomizationModel = mongoose.model(
  "cheese_Customization",
  cheeseCustomizationSchema
);





