import { Router } from "express";


const wishListRouter = Router()

wishListRouter.get('/getWish')
wishListRouter.post('/addWish')
wishListRouter.post('/removeWish')

export default wishListRouter