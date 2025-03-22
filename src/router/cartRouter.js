import { Router } from "express";
import cartController from "../controller/cartController.js";


const cartRouter = Router()

cartRouter.get('/getCart',cartController.getCartParam)//Lấy cart của người dùng
cartRouter.get('/getCartItem',cartController.getCartItem)

cartRouter.post('/addToCart',cartController.AddToCart)
cartRouter.post('/removeOneItem',cartController.RemoveOneItem)


export default cartRouter