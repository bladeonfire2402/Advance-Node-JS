import { Router } from "express";
import newsController from "../controller/newsController.js";

const newsRouter = Router()

newsRouter.get("/getNews", newsController.getAllNews) //lấy tin tức
newsRouter.get("/getNewsById", newsController.getNewsById) //lấy tin tức theo id
newsRouter.get("/getNewsByTitle", newsController.getNewsByTitle) //lấy tin tức theo title
newsRouter.post("/createNews", newsController.createNews)//tạo tin tức
newsRouter.put("/updateNews", newsController.updateNews)//Update
newsRouter.delete("/deleteNews/:id", newsController.deleteNews)//Delete tin tức

export default newsRouter