import moment from "moment";
import dotenv from 'dotenv'
import crypto from 'crypto';



dotenv.config()


const vnPayParamGenerate=(orderData)=>{
    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");
    let expireDate = moment(date).add(15, "minutes").format("YYYYMMDDHHmmss");
    
    let ipAddr = "1.55.200.158";
    const tmnCode = process.env.CHECKOUT_SECRECT_TMNCODE;
    const returnUrl = 'http://localhost:3000/payment_return';
    let locale = "vn";
    let currCode = "VND";

    return {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale, 
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderData._id,//Lấy id của đơn hàng
        vnp_OrderInfo: `Payment for đơn hàng ${orderData._id}`,
        vnp_OrderType: "other",
        vnp_Amount:  orderData.totalAmount,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate,
    }
}

const sortParams =(obj)=>{
    const sortedObj = Object.entries(obj)
      .filter(
        ([key, value]) => value !== "" && value !== undefined && value !== null
      )
      .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  
    return sortedObj;
}

const signedGenerate=(urlParams)=>{
  const secretKey = process.env.CHECKOUT_SECRECT_CODE;

  const querystring = urlParams.toString();

  const hmac = crypto.createHmac("sha512", secretKey);

  const signed = hmac.update(querystring).digest("hex");

  return signed
}

const MomoConfig=()=>{
  const appUrl=process.env.APP_URL

  return({
    partnerCode:process.env.MOMO_PARTNERCODE,
    accessKey:process.env.MOMO_ACCESSKEY,
    secretkey:process.env.MOMO_SECRETKEY,
    redirectUrl:`http://localhost:5173/order/payment_return/`,
    ipnUrl:`${appUrl}/checkout/order/momo/payment/notify`
   }
  )
}

const momoParamsGenenrate=(orderData,signature,momoConfig)=>{
  return{
    partnerCode:momoConfig.partnerCode,
    accessKey:momoConfig.accessKey,
    requestId:orderData._id,
    amount:orderData.totalAmount,
    orderId:orderData._id,
    orderInfo:`bruh`,
    redirectUrl:momoConfig.redirectUrl,
    ipnUrl:momoConfig.ipnUrl,
    extraData:'none',
    requestType:'captureWallet',
    signature:signature,
    lang:'en'
  }
}

const genrateSignature=(momoConfig,orderData)=>{
  const info = `bruh`
  const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${orderData.totalAmount}&extraData=none&ipnUrl=${momoConfig.ipnUrl}&orderId=${orderData._id}&orderInfo=${info}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${momoConfig.redirectUrl}&requestId=${orderData._id}&requestType=captureWallet`;

  console.log(rawSignature)


  const secretKey="K951B6PE1waDMi640xX08PD3vg6EkVlz"

 
  const signature = crypto.createHmac('sha256', secretKey) 
  .update(rawSignature)
  .digest('hex');

  console.log("chuỗi signature "+ signature)

  return signature
}

export {vnPayParamGenerate,sortParams,signedGenerate,momoParamsGenenrate,genrateSignature,MomoConfig}