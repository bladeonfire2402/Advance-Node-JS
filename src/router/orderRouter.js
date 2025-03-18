import { Router } from "express";
import orderController from "../controller/orderController.js";

const orderRouter = Router()

orderRouter.get('',()=>{})

orderRouter.post('/test/createOrderItem',orderController.createOrderItem)
orderRouter.post('/checkOutCod',orderController.checkOutCod)


export default orderRouter