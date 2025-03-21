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

    UpdateCategory = async(req,res)=>{
        const {name,slug,description,id}=req.body
 
        let isExist= await categoriesServices.getCategoryByName(name)
        if(isExist){return res.status(500).json({message:"Dữ liệu lỗi đã có tên danh mục này"})}

        isExist= await categoriesServices.getCategoryBySlug(slug)
        if(isExist){return res.status(500).json({message:"Dữ liệu lỗi đã có slug danh mục này"})}

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (slug !== undefined) updateData.slug = slug;
        if (description !== undefined) updateData.description = description;

        const newCategory = await categoriesServices.updateCategory(id,updateData)

        return res.status(200).json({
            message:"Update danh mục thành công",
            newCategory
        })
        
    }
}

export default new categoryController