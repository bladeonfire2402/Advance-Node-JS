import { trusted } from "mongoose"
import cartItemModel from "../model/cartItemModel.js"
import cartModel from "../model/cartModel.js"

class cartServices{
    createCart=async(userId)=>{
        try{
            const userCart = await cartModel.create({user:userId})

            return userCart
        }
        catch(e){
            return e
        }
    }

    getUserCart= async(id)=>{
        try {
            const userCart = await cartModel.findOne({user:id})
            console.log(id)
            return userCart
            
        } catch (error) {
            return error.message
        }
    }

    getCartItemByProductId=async(productId)=>{
        try {
            const cartItem = await cartItemModel.findOne({product:productId})
            return cartItem
            
        } catch (error) {
            console.log(error)
            return false
        }
    }

    plusOneProduct = async(cartItem)=>{
        try{
            //Cộng thêm 1 sản phẩm vào giỏ hàng
            cartItem.quantity+=1
            //Lưu lại vào db
            await cartItem.save()

            return cartItem
        }
        catch(e){
            return e
        }
    }

    minusOneProduct = async(cartItem)=>{
        try {
            const preQuantity = cartItem.quantity;
            
            cartItem.quantity=preQuantity-1;

            await cartItem.save()

            return cartItem
            
        } catch (error) {
            return error;
        }
    }

    //Thêm hoặc xóa cartItem khởi cart
    updateCart = async(userId,cartItem_Id,method)=>{
        if(method=="add"){
            try {
                const newCart=await cartModel.findOneAndUpdate({user:userId},{
                    $addToSet:{cart:cartItem_Id}
                },{new:true})
                return newCart
            } 
            catch (error) {
                console.log(error)
                return error
            }
        }
        else if(method=="remove"){
            try {
                const newCart=await cartModel.findOneAndUpdate({user:userId},{
                    $pull:{
                        cart:cartItem_Id
                    }
                },{new:true})
                return newCart
            } 
            catch(e){
                return e
            }
            
        }
    }

    deleteCartItem=async(productId)=>{
        try{
            const deleteCartItem = await cartItemModel.deleteOne({product:productId})

            return deleteCartItem
        }
        catch(e){
            return e
        }
    }

    createCartItem=async(productId)=>{
        try{
            const cartItem = await cartItemModel.create({product:productId,quantity:1})
            return cartItem
        }
        catch(e){
            return e
        }
    }
}
export default new cartServices