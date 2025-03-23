import { Router } from "express";
import wishListController from "../controller/wishListController.js";


const wishListRouter = Router()

wishListRouter.get('/getWish',wishListController.getWishList)
wishListRouter.post('/addWish',wishListController.AddToWishList)
wishListRouter.post('/removeWish',wishListController.RemoveFromWish)

export default wishListRouter