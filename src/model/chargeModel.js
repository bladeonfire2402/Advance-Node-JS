import mongoose from "mongoose";

const chargeModel = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    point:{type:Number,enum:[50000,100000,500000,1000000],require:true},
    paymentStatus:{type:String,enum:["Pending","Paid","Failed"]}
},{timestamps:true})

export default mongoose.model('charge',chargeModel)