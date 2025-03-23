import { Router } from "express";

import productViewController from "../controller/productViewController.js";


const productViewRouter = Router()

productViewRouter.get('/getAllviews',productViewController.getAllProductView)
productViewRouter.get('/getAllviewsProduct',productViewController.getAllProductViewByProductId)//Lấy tất cả bản ghi views của 1 product

productViewRouter.get('/topView',productViewController.top4productView)
productViewRouter.post('/increseaView',productViewController.plusOneView)

export default productViewRouter