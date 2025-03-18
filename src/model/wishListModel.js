import mongoose from "mongoose";

const wishListModel= mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref: 'user',required: true,},
    wishes:[{type:mongoose.Schema.Types.ObjectId,ref:"product"}]
})

export default new mongoose.model('wishlist',wishListModel)