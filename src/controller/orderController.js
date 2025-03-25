import cartServices from "../services/cartServices.js"
import orderServices from "../services/orderServices.js"
import userServices from "../services/userServices.js"
import { vnPayParamGenerate,sortParams, signedGenerate, momoParamsGenenrate, MomoConfig, genrateSignature } from "../utils/checkout/checkout-utils.js"
import { sendPaymentRequestToMoMo } from "../api/momo.js"
import walletServices from "../services/walletServices.js"

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
        const {userId}=req.query
        const userOrders = await orderServices.getOrdersByUserId(userId)
        if(!userOrders|| userOrders.length==0){return res.status(500).json({message:"Không có đơn hàng"})}

        return res.status(200).json({
            message:"Lấy tất cả dữ liệu đơn hàng thành công",
            userOrders
        })
    }

    //Hàm này chưa xong
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

    //
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

    checkOutWithWallet = async(req,res)=>{
        const {userId,address}=req.body
        
        let wallet = await walletServices.getWallet(userId)
        if(!wallet){wallet= await walletServices.createWallet(userId)}

        const userCart = await cartServices.getUserCartWithProduct(userId)
        if(!userCart){return res.status(500).json({message:'Không tìm thấy giỏ hàng'})}

        //truyền vô id người dùng
        const user = await userServices.getUserById(userId)
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

        if(totalPrice>wallet.points){
            return res.status(500).json({message:"Số dư ví không đủ"})
        }

        //Trừ tiền trong ví
        const chargeWallet = await walletServices.chargeWallet(wallet,totalPrice)
        if(!chargeWallet){return res.status(500).json({message:"Lỗi thanh toán"})}

        const OrderData = ({
            user: user._id,
            orderItems,
            totalAmount:totalPrice,
            paymentMethod:'Ví',
            paymentStatus:'Paid',
            address: address,
            vnp_TxnRef:"None",
            itemsPrice,
            shippingPrice, 
        });

        const order = await orderServices.createOrder(OrderData)
        if(!order){return res.status(500).json({message:"Lỗi tạo đơn"})}

        //Sau khi tạo order xong thì phải empty cart
        const EmptyCart= await cartServices.emptyCart(userId)

          //Xóa cartItem
        for(const item of userCart.cart){
            await cartServices.deleteCartItem(item.product._id)
        }

        return res.status(200).json({
            message:"Đã đặt hàng thành công bằng ví"
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
        return res.json({ payUrl: paymentUrl });
    };

    verifyMomoPayment=async(req,res)=>{
        const {paymentstate,orderid}=req.body

        //Nếu thanh toán thành công cập nhật 
        let paymentState='Pending';
        if(paymentstate=='Successful.'){
            paymentState= "Paid"
        }else{
            return res.status(500).json({message:"Thanh toán thất bại",paymentstate})
        }
        
        const orderId = orderid

        const updatedStatus = {
            paymentStatus:paymentState,
            orderStatus:"Approved",
        }
        
        const order=  await orderServices.updateOrder(orderId,updatedStatus)

        return res.status(200).json({
            message:"Thanh toán đơn hàng thành công",
        })
    }

    cancelOrder=async(req,res)=>{
        const {orderId}=req.body

        const newData = {
            orderStatus:"Cancelled"
        }
        const order = await orderServices.updateOrder(orderId,newData)
        if(!order){return res.status(500).json({message:"Lỗi fetching order này"})}

        return res.status(200).json({
            message:"Đã hủy đơn hàng"
        })
    }


    //Đồng ý refund // admin
    aproveRefund = async(req,res)=>{
        const {refundId,orderId,feedBack,userId}=req.body

        if(feedBack==undefined){feedBack="Sản phẩm sẽ được đổi trả, số tiền mua sẽ được trả về ví của bạn"}

        const refund = await orderServices.updateRefund(refundId,"Đã xác nhận",feedBack)
        if(!refund){return res.status(500).json({message:"Lỗi update đổi trả"})}

        const newOrderData = {
            orderStatus:"Return"
        }

        const updateOrder = await orderServices.updateOrder(orderId,newOrderData)
        if(!updateOrder){return res.status(500).json({message:"Lỗi update đơn hàng"})}

        let wallet = await walletServices.getWallet(userId)
        if(!wallet){wallet=await walletServices.createWallet(userId)}

        const returnPoint = updateOrder.totalAmount - 20000
        const addPoint = await walletServices.addPoint(wallet,returnPoint)

        return res.status(200).json({mesage:"Số tiền đã được hoàn trả về ví Lunaxi người dùng",addPoint})

    }

    //Không Đồng ý refund // admin
    disaproveRefund = async(req,res)=>{
        const {refundId,feedBack}=req.body

        if(feedBack==undefined){feedBack="Rất tiếc sản phẩm bạn sẽ không đổi trả"}

        const refund = await orderServices.updateRefund(refundId,"Bác bỏ",feedBack)
        if(!refund){return res.status(500).json({message:"Lỗi update đổi trả"})}
        
        return res.status(200).json({mesage:"bác bỏ thành công",refund})
    }

    

    requestRefund = async(req,res)=>{
        const {orderId,userId,reason}= req.body

        const order= await orderServices.getOrderById(orderId)
        if(!order){return res.status(500).json({message:"Lỗi không tìm thấy đơn hàng"})}

        if(order.orderStatus!="Delivered"){
            return res.status(500).json({message:"Đơn hàng không hợp lệ"})
        }
        
        const refundData={
            user:userId,
            orderId:orderId,
            reason,
        }

        //Check xem có yêu cầu đổi trả chưa
        const isRefund = await orderServices.getRefundByOrderId(orderId)
        if(isRefund){return res.status(500).json({mesage:"Đã có yêu cầu đổi hàng rồi"})}

        const refund = await orderServices.createRefund(refundData)
        if(!refund){return res.status(500).json({message:"Lỗi tạo yêu cầu refund"})}

        return res.status(200).json({message:"Yêu cầu hoàn trả được gửi",refund})
    }

    //admin
    getAllRefund =async(req,res)=>{
        const refunds= await orderServices.getAllRefund()
        if(!refunds || refunds.length==0){return res.status(500).json({mesage:"Chưa có yêu cầu đổi trả"})}

        return res.status(200).json({
            mesage:"Lấy tất cả yêu cầu đổi trả thành công",
            refunds
        })
    }

    getAllUserRefund=async(req,res)=>{
        const {userId}=req.query

        const userRefund= await orderServices.getUserRefundByUserID(userId)
        if(!userRefund ){return res.status(500).json({mesage:"Lỗi lấy yêu cầu đổi hàng "})}
        if(userRefund.length ){return res.status(200).json({mesage:"Chưa có yêu cầu đổi hàng"})}

        return res.status(200).json({mesage:"Lấy yêu cầu đổi hàng người dùng thành công",userRefund})
    }

    //ADMIN BRUHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
    //Hàm cập nhập trạng thái đơn hàng
    changeOrderStaus = async(req,res)=>{
        const {orderId,orderStatus}=req.body
        const order = await orderServices.getOrderById(orderId)
        if(!order){return res.status(500).json({message:"Lỗi không tìm thấy đơn hàng"})}

        if(orderStatus=="Cancelled" || orderStatus=="Delivered"){
            return res.status(500).json({message:`Đơn hàng đã ${orderStatus} không thể thay đổi được`})
        }

        const newData = {
            orderStatus:orderStatus
        }

        const updatedOrder  = await orderServices.updateOrder(orderId,newData)

        return res.status(200).json({message:"Đã update trạng thái đơn hàng",updatedOrder})
    }
}
export default new orderController