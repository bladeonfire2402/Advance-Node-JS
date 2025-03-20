import { Router } from "express";
import orderController from "../controller/orderController.js";
import verifyPayment from "../api/verifyMomo.js";

const orderRouter = Router()

orderRouter.get('',()=>{})
orderRouter.get('/paymentReturn', orderController.verifyMomoPayment);//hàm này để verify payment success không
orderRouter.post('/checkOutCod',orderController.checkOutCod)
orderRouter.post('/vnPay',orderController.checkOutvnPay)
orderRouter.post('/checkOutMomo',orderController.checkOutMomo)
orderRouter.post('/verifyMomoPayment',orderController.verifyMomoPayment)






export default orderRouter