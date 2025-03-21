import mongoose  from "mongoose";

const newsModel = mongoose.Schema({
    title:{type:String,required:true},
    description:{}
    
},{timestamps:true})