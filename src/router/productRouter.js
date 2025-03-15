import { Router } from "express";
import productController from "../controller/productController.js";
import Remoteupload from "../middleware/storage.js";


const productRouter= Router()

productRouter.get("/getProduct",productController.GetProducts)

productRouter.post("/createProduct",Remoteupload.single("image"),productController.CreateProduct) //Admin
productRouter.post("/createProWithImage",Remoteupload.single("image"),productController.uploadImage)

export default productRouter