import { Router } from "express";
import productController from "../controller/productController.js";
import Remoteupload from "../middleware/storage.js";


const productRouter= Router()

productRouter.get("/getProduct",productController.GetProducts)
productRouter.get("/getById",productController.GetProductById)
productRouter.post("/createProduct",Remoteupload.single("image"),productController.CreateProduct) //Admin
productRouter.put("/updateProduct",productController.UpdateProduct)
productRouter.delete("/deleteProduct",productController.DeleteProduct)

export default productRouter