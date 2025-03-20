import cartServices from "../services/cartServices.js"
import orderServices from "../services/orderServices.js"
import userServices from "../services/userServices.js"
import { vnPayParamGenerate,sortParams, signedGenerate, momoParamsGenenrate, MomoConfig, genrateSignature } from "../utils/checkout/checkout-utils.js"
import { sendPaymentRequestToMoMo } from "../api/momo.js"

class orderController {
    //Lấy tât cả đơn hàng
    getOrders=async(req,res)=>{
        const orders = await orderServices.getAllOrders()
        if(!orders){return res.status(500).json({message:"Lỗi lấy dữ liệu người dùng"})}

        return res.status(200).json({
            message:"Lấy dữ liệu đơn hàng thành công",
            orders
        })
    }

    //Lấy tất cả đơn hàng người dùng
    getUserOrders=async(req,res)=>{
        //Lấy theo id người dùng
        const userOrders = await orderServices.getOrdersByUserId(req.body._id)
        if(!userOrders|| userOrders.length==0){return res.status(500).json({message:"Không có đơn hàng"})}

        return res.status(200).json({
            message:"Lấy dữ liệu đơn hàng thành công",
            userOrders
        })
    }

    //
    updateOrder=async(req,res)=>{
        //truyền vô id đơn hàng
        const order= await orderServices.getOrderById(req.body._id)
        if(!order){return res.status(500).json({message:"Không có order này"})}

        const newOrderData = {

        }

        const updatedOrder = await orderServices.updateOrder(req.body._id,newOrderData)

        return res.status(200).json({
            message:'Update sản phẩm thành công',
            updatedOrder
        })

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

    checkOutvnPay=async(req,res)=>{
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
            paymentMethod:'VNPay',
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


        //thanh toán vnpay
       
        const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

        let vnp_Params=vnPayParamGenerate(order)
        
        const sortedParams = sortParams(vnp_Params);

        const urlParams = new URLSearchParams();
        for (let [key, value] of Object.entries(sortedParams)) {
            urlParams.append(key, value);
        }

        const signed=signedGenerate(urlParams)

        urlParams.append("vnp_SecureHash", signed);

        const paymentUrl = `${vnpUrl}?${urlParams.toString()}`;

        return res.status(200).json({
           paymentUrl,
        })
    }

    checkOutMomo = async (req, res) => {
        // Lấy giỏ hàng của người dùng
        const userCart = await cartServices.getUserCartWithProduct(req.body._id);
        if (!userCart) {
            return res.status(500).json({ message: 'Không tìm thấy giỏ hàng' });
        }
    
        // Truyền vào id người dùng để lấy thông tin người dùng
        const user = await userServices.getUserById(req.body._id);
        if (!user) {
            return res.status(500).json({ message: "Không có người dùng này" });
        }
    
        // Kiểm tra nếu giỏ hàng không có sản phẩm
        if (userCart.cart.length == 0) {
            return res.status(500).json({ message: "Chưa có sản phẩm trong giỏ" });
        }
    
        // Tạo danh sách các sản phẩm trong đơn hàng
        const orderItems = userCart.cart.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price // Lấy giá tại thời điểm checkout
        }));
    
        // Tính toán tổng giá trị đơn hàng
        const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingPrice = 20000; // Giá vận chuyển, có thể thay đổi theo cách tính động
        const totalPrice = itemsPrice + shippingPrice;
    
        // Dữ liệu đơn hàng
        const OrderData = ({
            user: user._id,
            orderItems,
            totalAmount: totalPrice,
            paymentMethod: 'Momo',
            paymentStatus: 'Pending',
            address: req.body.address,
            vnp_TxnRef: "None",
            itemsPrice,
            shippingPrice,
        });
    
        // Tạo đơn hàng mới trong cơ sở dữ liệu
        const order = await orderServices.createOrder(OrderData);
        if (!order) {
            return res.status(500).json({ message: "Lỗi tạo đơn" });
        }

        //Sau khi tạo order xong thì phải empty cart
        const EmptyCart= await cartServices.emptyCart(req.body._id)

          //Xóa cartItem
          for(const item of userCart.cart){
            await cartServices.deleteCartItem(item.product._id)
        }
    
        // Cấu hình MoMo và tạo chữ ký bảo mật
        const momoConfig = MomoConfig();
        const signature = genrateSignature(momoConfig, order);
        const paymentData = momoParamsGenenrate(order, signature, momoConfig);
    
        // Dữ liệu yêu cầu gửi đi
        const paymentUrl = await sendPaymentRequestToMoMo(paymentData); 
        res.json({ payUrl: paymentUrl });
    };

    verifyMomoPayment=async(req,res)=>{
        const { query } = req;

        //Nếu thanh toán thành công cập nhật 
        let paymentState='Pending';
        if(query.message=='Successful.'){
            paymentState= "Paid"
        }else{
            return res.status(500).json({message:"Thanh toán thất bại",query})
        }
        
        const orderId = query.orderId

        const updatedStatus = {
            paymentStatus:paymentState,
        }
        
        const order=  await orderServices.updateOrder(orderId,updatedStatus)

        return res.status(200).json({
            message:"Thanh toán đơn hàng thành công",
        })
    }
}
export default new orderController