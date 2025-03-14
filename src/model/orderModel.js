import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    cart: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'cart',
        required:true
      }   
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Trực tiếp',"VNPay"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    vnp_TxnRef:{type:String} , // Mã giao dịch VNPay
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
 
);

export default mongoose.model('Order', OrderSchema);

