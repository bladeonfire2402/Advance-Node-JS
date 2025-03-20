import mongoose from "mongoose";

const walletModel = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    points:{type:Number,default:0},
    chargeList:[]
})

export default mongoose.model('wallet',walletModel)