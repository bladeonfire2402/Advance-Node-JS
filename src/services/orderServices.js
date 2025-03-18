import orderModel from "../model/orderModel.js"

class orderServices{
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
    
}

export default new orderServices