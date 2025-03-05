import categoriesServices from "../services/categoriesServices.js"

class categoryController {
    CreateCategory=async(req,res)=>{
        const {name,slug }= req.body;
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
}

export default new categoryController