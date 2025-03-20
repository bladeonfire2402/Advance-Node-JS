import mongoose from "mongoose";

const productViewModel= mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:"product",required:true},
    views:{type:Number,required:true}
},{timestamps:true})

export default mongoose.model('ProductView',productViewModel)

