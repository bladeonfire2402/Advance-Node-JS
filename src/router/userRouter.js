import { Router } from "express";
import userController from "../controller/userController.js";

const userRouter = Router()


userRouter.get('/getUserInfo',userController.getUserInfoByToken)
userRouter.get('/getUsers', userController.getAllUser)
userRouter.put('/updateUser',userController.updateUserInfo)


export default userRouter