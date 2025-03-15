import {Router} from 'express'
import authRouter from './authRouter.js'
import testRouter from './testRouter.js'
import categoryRouter from './categoryRouter.js'
import productRouter from './productRouter.js'
import userRouter from './userRouter.js'
import cartRouter from './cartRouter.js'

const IndexRouter= Router()

//Auth
IndexRouter.use('/auth',authRouter)

//
IndexRouter.use('/category',categoryRouter)

//
IndexRouter.use('/product',productRouter)

//user
IndexRouter.use('/user',userRouter)

//cart
IndexRouter.use('/cart',cartRouter)

//
IndexRouter.use('/test',testRouter)

//


export default IndexRouter