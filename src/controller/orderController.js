import cartServices from "../services/cartServices.js"

class orderController {
    createOrder=async(req,res)=>{
        
        
    }

    updateOrder=async(req,res)=>{

    }

    //Hàm test tạo order
    createOrderItem = async(req,res)=>{
        
    }

    checkOut = async(req,res)=>{
        const userCart = await cartServices.getUserCartWithProduct(req.body._id)
        if(!userCart){return res.status(500)}
        
        return userCart
    }
}
export default new orderController