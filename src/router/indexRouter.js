import {Router} from 'express'
import authRouter from './authRouter.js'
import testRouter from './testRouter.js'
import categoryRouter from './categoryRouter.js'

const IndexRouter= Router()

//Auth
IndexRouter.use('/auth',authRouter)

//
IndexRouter.use('category',categoryRouter)

//
IndexRouter.use('/test',testRouter)


export default IndexRouter