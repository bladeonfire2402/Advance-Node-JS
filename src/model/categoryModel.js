import mongoose from "mongoose";

const categoryModel= mongoose.Schema({
    name:{type:String,required:true,unique:true,default:"Chưa có danh mục"},
    slug:{type:String,unique:true,required:true},
    description:{type:String},
    product:[{type:mongoose.Schema.Types.ObjectId,ref:"product"}]
},{timestamps:true})

export default mongoose.model("category",categoryModel)