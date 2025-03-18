import orderModel from "../model/orderModel.js"
import cartServices from "../services/cartServices.js"
import orderServices from "../services/orderServices.js"
import userServices from "../services/userServices.js"

class orderController {
    createOrder=async(req,res)=>{
        
        
    }

    updateOrder=async(req,res)=>{

    }

    //Hàm test tạo order
    createOrderItem = async(req,res)=>{
        
    }

    checkOutCod = async(req,res)=>{
        //id người dùng
        const userCart = await cartServices.getUserCartWithProduct(req.body._id)
        if(!userCart){return res.status(500).json({message:'Không tìm thấy giỏ hàng'})}

        //truyền vô id người dùng
        const user = await userServices.getUserById(req.body._id)
        if(!user){return res.status(500).json({message:"Không có người dùng này"})}

        
        if(userCart.cart.length==0){
            return res.status(500).json({message:"Chưa có sản phẩm trong giỏ"})
        }

        const orderItems = userCart.cart.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price // Lấy giá tại thời điểm checkout
        }));

        const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingPrice = 20000; // fixed or dynamic
        const totalPrice = itemsPrice + shippingPrice;

        const OrderData = ({
            user: user._id,
            orderItems,
            totalAmount:totalPrice,
            paymentMethod:'Trực tiếp',
            paymentStatus:'Pending',
            address: req.body.address,
            vnp_TxnRef:"None",
            itemsPrice,
            shippingPrice, 
        });

        const order = await orderServices.createOrder(OrderData)
        if(!order){return res.status(500).json({message:"Lỗi tạo đơn"})}

        //Sau khi tạo order xong thì phải empty cart
        const EmptyCart= await cartServices.emptyCart(req.body._id)

          //Xóa cartItem
          for(const item of userCart.cart){
            await cartServices.deleteCartItem(item.product._id)
        }

        return res.status(200).json({
            message:"Đặt hàng thành công",
            user,
            order,
            EmptyCart
        })
    }

    vnPay=async(req,res)=>{

    }
}
export default new orderController