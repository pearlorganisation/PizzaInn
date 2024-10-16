// -------------------------------------------Imports------------------------------------------------------
import mongoose from "mongoose";
// ----------------------------------------------------------------------------------------------------------

const sizeCustomizationSchema = new mongoose.Schema({
 
      name: {
        type: String,
        required: [true, "Size Name is a required field"],
      }
    }

);

export const 
sizeCustomizationModel = mongoose.model(
  "size_Customization",
  sizeCustomizationSchema
);





