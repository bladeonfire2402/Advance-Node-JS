import categoriesServices from "../services/categoriesServices.js"

class categoryController {
    CreateCategory=async(req,res)=>{
        const {name,slug,description }= req.body;
        let category = await categoriesServices.getCategoryBySlug(slug)
        
        if(category){return res.status(500).json({
            message:"Đã có danh mục này"
        })}

        category= await categoriesServices.getCategoryByName(name)
        if(category){return res.status(500).json({message:"Đã có tên danh mục này"})}

        category=await categoriesServices.createCategory(req.body)

        return res.status(200).json({
            message:"Đã tạo danh mục thành công",
            category
        })
    }

    getCategory=async(req,res)=>{
        const categories = await categoriesServices.getCategoryAll()

        return res.status(200).json({
            message:"Đã lấy tất cả danh mục",
            categories
        })
    }

    
}

export default new categoryController