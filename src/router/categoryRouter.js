import {Router} from 'express'
import categoryController from '../controller/categoryController.js'
import checkPermissionAd from '../middleware/checkPermissionAdmin.js'

const categoryRouter = Router()

categoryRouter.get('/getCategory',categoryController.getCategory)
categoryRouter.post('/createCategory',checkPermissionAd,categoryController.CreateCategory)

export default categoryRouter
