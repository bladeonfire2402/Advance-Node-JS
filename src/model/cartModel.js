import mongoose from "mongoose";

const cartModel = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    cart:[{type:mongoose.Schema.Types.ObjectId,ref:"cartItem"}]
})

export default mongoose.model("cart",cartModel)