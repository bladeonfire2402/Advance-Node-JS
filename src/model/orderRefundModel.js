import mongoose from "mongoose";

const orderRefund = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
    },
    orderId:{type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    feedBack:{type:String,default:"Vui lòng đợi admin feedBack"},
    reason:{type:String,required:true},
    status:{type:String,default:"Chờ duyệt"}
})

export default mongoose.model('orderRefund',orderRefund)