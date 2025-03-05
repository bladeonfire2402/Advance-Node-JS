
import mongoose from "mongoose";

const productModel = mongoose.Schema({
    productName:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:"category",required:true}
},{timestamps:true})

export default mongoose.model("product",productModel)