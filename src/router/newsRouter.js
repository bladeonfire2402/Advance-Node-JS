import { Router } from "express";

const newsRouter = Router()

newsRouter.get('/getNews',) //lấy tin tức
newsRouter.post('/createNews',)//Tạo tin tức
newsRouter.put('/updateNew',)//Update
newsRouter.delete('/deleteNews',)//Delete tin tức

export default newsRouter