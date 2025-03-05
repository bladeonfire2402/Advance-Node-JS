import mongoose from "mongoose";

const categoryModel= mongoose.Schema({
    name:{type:String,required:true,unique:true,default:"Chưa có loại sản phẩm"},
    slug:{type:String,unique:true,required:true},
    product:[{type:mongoose.Schema.Types.ObjectId,ref:"product"}]
},{timestamps:true})

export default mongoose.model("category",categoryModel)