import mongoose  from "mongoose";
//NHi viêt
const newsModel = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String}
    
},{timestamps:true})