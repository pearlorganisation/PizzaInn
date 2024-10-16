import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"auth",
        required:[true,"User Id is required! "]
    },
address:{
    type:String,
    required:[true,"Address is Required!"]
},
postCode:{
    type:String,
    // required:[true,"Post Code is Required!"]
},
note:{
    type:String,
    // required:[true,"Note is Required!"]
}
})

export default mongoose.model("address",addressSchema)