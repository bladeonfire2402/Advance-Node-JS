import orderModel from "../model/orderModel.js"

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

    

    
}

export default new orderServices