import {Router} from 'express'
import authController from '../controller/authController.js'


const testRouter= Router()
//Test Auth
testRouter.post('/login',authController.signIn) //http://localhost:4000/api/test/signIn
testRouter.post('/login',authController.signUp) //http://localhost:4000/api/test/signUp
testRouter.post('/sendEmail',authController.sendNotify) //http://localhost:4000/api/test/sendEmail


export default testRouter