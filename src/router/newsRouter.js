import { Router } from "express";

const newsRouter = Router()

newsRouter.delete('/deleteNews',)//Delete tin tức
newsRouter.get('/getNews',) //lấy tin tức
newsRouter.post('/createNews',)//Tạo tin tức
newsRouter.put('/updateNew',)//Update


export default newsRouter