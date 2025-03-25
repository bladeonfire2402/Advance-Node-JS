import mongoose  from "mongoose";
//NHi viêt
const newsModel = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String},
    publishedDate:{type:Date, default:Date.now}
},
{timestamps:true})
export default mongoose.model("news", newsModel);
