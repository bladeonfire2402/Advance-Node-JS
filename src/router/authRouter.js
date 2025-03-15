import {Router} from 'express'

import authController from '../controller/authController.js'

const authRouter = Router()

authRouter.post("/signUp",authController.signUp)
authRouter.post("/signIn",authController.signIn)
authRouter.post('/verifyAccount',authController.verifyAccount)
authRouter.post("/resendEmail",authController.resendEmail)

export default authRouter