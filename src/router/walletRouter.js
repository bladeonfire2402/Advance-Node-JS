import { Router } from "express";
import walletController from "../controller/walletController.js";

const walletRouter = Router()

walletRouter.get('/getWallet',walletController.getUserWalletInfo)//Lấy ví người dùng

walletRouter.post('/addFund',walletController.addPoints)//Nạp tiền
walletRouter.post('/verifyPayment',walletController.verifyPaymentWallet)


export default walletRouter