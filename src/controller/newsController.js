//NHI Viết
import newsModel from "../model/newsModel.js"
import newsRouter from "../router/newsRouter.js"
import newsServices from "../services/newServices.js"
import mongoose from "mongoose"

class newsController{
    // llấy tất cả tin tức
    getAllNews = async (req, res) => {
        const news = await newsServices.getAllNews()
        if (!news) {
            return res.status(500).json({ message: "Lỗi lấy dữ liệu" })
        }
        return res.status(200).json({
            message: "Lấy dữ liệu thành công",
            news
        })
    }



    // llấy tin tức theo id 
    getNewsById = async (req, res) => {
        const id = req.query.id
        
        if (!id) {
            return res.status(400).json({ message: "Thiếu ID" })
        }
    
        const news = await newsServices.getANewsById(id)
    
        if (!news) {
            return res.status(404).json({ message: "Không tìm thấy" })
        }
    
        return res.status(200).json({ news })
    }
    

    // lấy tin tức theo title
    getNewsByTitle = async (req, res) => {
        const { title } = req.query
        const news = await newsServices.getNewsByTitle(title)

        if (!news) {
            return res.status(404).json({ message: "Không tìm thấy bài viết" })
        }

        return res.status(200).json({
            message: "Lấy dữ liệu thành công",
            news
        })
    }

    // ttạo tin tức mới
    createNews = async (req, res) => {
        const { title, description } = req.body
        if (!title || !description) {
            return res.status(400).json({ message: "Không được để trống trường này " })
        }

        const newNews = await newsServices.createNews({ title, description })
        if (!newNews) {
            return res.status(500).json({ message: "Lỗi tạo" })
        }
        return res.status(201).json({
            message: "Tạo tin tức thành công",
            data: newNews
        })
    }

    // cập nhật tin tức
    updateNews = async (req, res) => {
        const { id, title, description } = req.body

        if (!id) {
            return res.status(400).json({ message: "Id không được bỏ trống" })
        }

        const updateData = {}
        if (title !== undefined) updateData.title = title
        if (description !== undefined) updateData.description = description

        const updatedNews = await newsServices.updateNews(id, { title, description })
        if (!updatedNews) {
            return res.status(500).json({ message: "Cập nhật thất bại" })
        }
        return res.status(200).json({
            message: "Cập nhật thành công",
            updatedNews
        })
    }

    // xóa tin tức
    deleteNews = async (req, res) => {
        try{
            await newsModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Xóa thành công");
        }catch(error){
            res.status(500).json(error)
        }
    }
};

export default new newsController
