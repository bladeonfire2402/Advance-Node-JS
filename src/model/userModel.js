import mongoose from "mongoose";

const userModel = mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    pwd:{type:String,required:true},
    phone:{type:String,required:true},
   
    //Not send
    role:{type:String,default:"user"},
    verified:{type:Boolean,default:false},
    block:{type:Boolean,default:false}
},{timestamps:true})

export default mongoose.model("user",userModel)