import {Router} from 'express'
import authRouter from './authRouter.js'
import testRouter from './testRouter.js'
import categoryRouter from './categoryRouter.js'
import productRouter from './productRouter.js'
import userRouter from './userRouter.js'
import cartRouter from './cartRouter.js'
import orderRouter from './orderRouter.js'
import wishListRouter from './wishListRouter.js'

const IndexRouter= Router()

//Auth
IndexRouter.use('/auth',authRouter)

//Category
IndexRouter.use('/category',categoryRouter)

//Product
IndexRouter.use('/product',productRouter)

//user
IndexRouter.use('/user',userRouter)

//cart
IndexRouter.use('/cart',cartRouter)

//order
IndexRouter.use('/order',orderRouter)  

//wishList
IndexRouter.use('/wishList',wishListRouter)

//
IndexRouter.use('/test',testRouter)

//w


export default IndexRouter