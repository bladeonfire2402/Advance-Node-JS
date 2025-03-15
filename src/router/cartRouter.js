import { Router } from "express";
import cartController from "../controller/cartController.js";


const cartRouter = Router()

cartRouter.post('/addToCart',cartController.AddToCart)
cartRouter.post('/removeOneItem',cartController.RemoveOneItem)


export default cartRouter