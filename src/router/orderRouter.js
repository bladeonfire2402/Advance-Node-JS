import { Router } from "express";
import orderController from "../controller/orderController.js";


const orderRouter = Router()

orderRouter.get('',()=>{})
orderRouter.get('/getAllOrders',orderController.getOrders)//API bên admin
//APi người dùng
orderRouter.get('/getUserOrders',orderController.getUserOrders)
orderRouter.post('/cancelOrder', orderController.cancelOrder)
orderRouter.post('/paymentReturn', orderController.verifyMomoPayment);//hàm này để verify payment success không
;//hàm này để verify payment success không
orderRouter.post('/checkOutCod',orderController.checkOutCod)
orderRouter.post('/vnPay',orderController.checkOutvnPay)
//Momo
orderRouter.post('/checkOutMomo',orderController.checkOutMomo)
orderRouter.post('/verifyMomoPayment',orderController.verifyMomoPayment)
orderRouter.put('/updateOrder',orderController.updateOrder)



export default orderRouter