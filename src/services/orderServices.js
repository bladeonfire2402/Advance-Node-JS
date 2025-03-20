import orderModel from "../model/orderModel.js"

class orderServices{
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

    getOrdersByUserId=async(userId)=>{
        try{
            const orders=await orderModel.find(userId)

            return orders
        }
        catch(e){
            console.log(e)
            throw new Error(e)
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