import mongoose from "mongoose";

const cartItemModel = mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},
    quantity:{type:Number,require:true}
},{timestamps:true})
export default mongoose.model("cartItem",cartItemModel)