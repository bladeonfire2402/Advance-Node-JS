import { Router } from "express";
import userController from "../controller/userController.js";

const userRouter = Router()


userRouter.get('/getUserInfo',userController.getUserInfoByToken)
userRouter.get('/getUsers', userController.getAllUser)


export default userRouter