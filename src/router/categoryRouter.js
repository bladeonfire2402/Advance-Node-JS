import {Router} from 'express'
import categoryController from '../controller/categoryController.js'

const categoryRouter = Router()

categoryRouter.post('/createCategory',categoryController.CreateCategory)

export default categoryRouter
