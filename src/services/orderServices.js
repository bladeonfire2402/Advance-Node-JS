import orderModel from "../model/orderModel.js"
import orderRefundModel from "../model/orderRefundModel.js"

class orderServices{
    //Lấy id order
    getOrderById =async(orderId)=>{
        try{
            const order=await orderModel.findOne({_id:orderId})
            return order
        }
        catch(e){
            console.log(e)
            throw new Error(e)
        }
    }

    getRefundByOrderId=async(orderId)=>{
        try {
            const refund = await orderRefundModel.findOne({
                orderId:orderId
            })

            return refund

        } catch (error) {
            throw new Error(error)            
        }
    }

    getAllRefund=async()=>{
        try {
            const refunds = await orderRefundModel.find()

            return refunds

        } catch (error) {
            throw new Error(error)            
        }
    }

    getUserRefundByUserID = async(userId)=>{
        try {
            const userRefunds= await orderRefundModel.find({
                user:userId
            })

            return userRefunds
            
        } catch (error) {
            throw new Error(error)
        }
    }

    createRefund=async(refundData)=>{
        try {
            const refund = await orderRefundModel.create(refundData)

            return refund
            
        } catch (error) {
            throw new Error(error)
        }
    }

    //
    getOrdersByUserId=async(userId)=>{
        try{
            const orders=await orderModel.find({user:userId}).populate({path:'user'})
            return orders
        }
        catch(e){
            console.log(e)
            throw new Error(e)
        }
    }

    getAllOrders=async()=>{
        try {
            const orders = await orderModel.find().populate({path:'user'})

            return orders
            
        } catch (error) {
            throw new Error(error)
        }
    }

    createOrder= async(orderData)=>{
        try{
            const order = orderModel.create(orderData)
            return order
        }
        catch(e){
            console.log(e)
            return false
        }
    }

    updateOrder = async(orderId,newData)=>{
        try {
            const updateOrder= await orderModel.findByIdAndUpdate(orderId,newData)
            
            return updateOrder
        } 
        catch (error) {
            throw new Error(error)
        }
    }

    updateRefund =async(refundId,status,feedBack)=>{
        try {
            const updateRefund= await orderRefundModel.findByIdAndUpdate(refundId,{
                status:status,
                feedBack:feedBack,
            })

            return updateRefund
            
        } catch (error) {
            throw new Error(error)
            
        }
    }

    
}

export default new orderServices