// -------------------------------------------Imports------------------------------------------------------
import mongoose from "mongoose";
// ----------------------------------------------------------------------------------------------------------

const baseCustomizationSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Base name is a required field"],
      },
      price:[{
        size:
        {type:mongoose.Types.ObjectId,
          ref:"size_Customization"
        },
        name:String,
        price:Number,
      }],
    }
);

export const 
baseCustomizationModel = mongoose.model(
  "base_Customization",
  baseCustomizationSchema
);





