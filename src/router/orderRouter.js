import { Router } from "express";
import orderController from "../controller/orderController.js";


const orderRouter = Router()

orderRouter.get('/getAllOrders',orderController.getOrders)//API bên admin
orderRouter.get('/getUserRefund',orderController.getAllUserRefund)
orderRouter.get('/getRefunds',orderController.getAllRefund)

//APi người dùng
orderRouter.get('/getUserOrders',orderController.getUserOrders)
orderRouter.post('/cancelOrder', orderController.cancelOrder)
orderRouter.post('/paymentReturn', orderController.verifyMomoPayment);//hàm này để verify payment success không
//hàm này để verify payment success không
orderRouter.post('/refund',orderController.requestRefund)
orderRouter.post('/checkOutCod',orderController.checkOutCod)
orderRouter.post('/vnPay',orderController.checkOutvnPay)
orderRouter.post('/checkOutWallet',orderController.checkOutWithWallet)
orderRouter.post('/aproveRefund',orderController.aproveRefund)
orderRouter.post('/disaproveRefund',orderController.disaproveRefund)

//Momo
orderRouter.post('/checkOutMomo',orderController.checkOutMomo)
orderRouter.post('/verifyMomoPayment',orderController.verifyMomoPayment)
orderRouter.put('/updateOrderStatus',orderController.changeOrderStaus)
orderRouter.put('/updateOrder',orderController.updateOrder)

export default orderRouter