import mongoose from "mongoose";

const orderItemModel = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
  productName: { type: String, required: true }, // snapshot
  productImage: { type: String },                 // snapshot
  price: { type: Number, required: true },        // snapshot
  quantity: { type: Number, required: true },
}, { _id: false });

export default mongoose.model('orderItem',orderItemModel)
