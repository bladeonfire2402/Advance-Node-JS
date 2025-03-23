
import { sendPaymentRequestToMoMo } from "../api/momo.js"
import walletServices from "../services/walletServices.js"
import {  genrateSignatureForWallet, momoConfigVer2, momoParamsGenenrateForWallet } from "../utils/checkout/checkout-utils.js"


class walletController {
    //
    getUserWalletInfo=async(req,res)=>{
        const {userId}= req.query

        let wallet = await walletServices.getWallet(userId)
        if(!wallet){wallet= await walletServices.createWallet(userId)}

        return res.status(200).json({
            message:"Lấy dữ liệu ví thành công",
            wallet
        })
    }
    
    addPoints=async(req,res)=> {
        const {userId, chargePoint}=req.body

        let wallet = await walletServices.getWallet(userId)
        if(!wallet){wallet= await walletServices.createWallet(userId)}

        const chargeData = {
            userData:userId,
            chargePoint:chargePoint,
        }

        //Tạo đơn nạp tiền
        const charge = await walletServices.createRecharge(chargeData)
        if(!charge){return res.status(500).json({message:"Lỗi nạp tiền"})}

        //Update lịch sử nạp tiền 
        await walletServices.updateHistoryCharge(wallet._id,charge._id)


        const MOMOCONFIG= momoConfigVer2()
        const signature = genrateSignatureForWallet(MOMOCONFIG, charge);
        const paymentData = momoParamsGenenrateForWallet(charge, signature, MOMOCONFIG);

        const paymentUrl = await sendPaymentRequestToMoMo(paymentData);
        return res.json({ payUrl: paymentUrl });
    }

    verifyPaymentWallet=async(req,res)=>{
        const {paymentstate,paymentId}=req.body
        
        //Nếu thanh toán thành công cập nhật 
        let paymentStatus='Pending';
        if(paymentstate=='Successful.'){
            paymentStatus= "Successful"
        }else{
            return res.status(500).json({message:"Thanh toán thất bại",paymentstate})
        }

        const successCharge = await walletServices.updateChargeSuccess(paymentId)
        if(!successCharge){return res.status(500).json({message:"lỗi update "})}
        
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
}

export default new walletController