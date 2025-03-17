import categoryModel from "../model/categoryModel.js"


class categoryServices{
    getCategoryBySlug= async(slug)=>{
        try{
            const category=await categoryModel.findOne({slug:slug})
            return category
        }
        catch(e){
            console.log(e)
        }
    }

    getCategoryByName= async(name)=>{
        try{
            const category=await categoryModel.findOne({name:name})
            return category
        }
        catch(e){
            console.log(e)
           
        }
    }

    getCategoryIdBySlug= async(slug)=>{
        try {
            const category= await categoryModel.findOne({slug:slug})
            return category._id
            
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getCategoryAll=async()=>{
        try {
            const categories = await categoryModel.find().populate({
                path:'product'
            })

            return categories
        } catch (error) {
            return error
        }
    }


    updateCategoryProduct = async(category_id,productId)=>{
        try {
            const categoryProduct=await categoryModel.findByIdAndUpdate(category_id,{
                $addToSet:{
                    product:productId
                }
            })
            console.log("Thêm sản phẩm vào category thành công");
            return categoryProduct
        } 
        catch (error) {
            console.log(error)
            return false
        }
    }

    removeProductInCategory = async (category_id,productId)=>{
        try {
            const categoryProduct=await categoryModel.findByIdAndUpdate(category_id,{
                $pull:{
                    product:productId
                }
            })
            console.log("Đã xóa sản phẩm khỏi danh mục");
            return categoryProduct
        } 
        catch (error) {
            console.log(error)
            return false
        }
    }


    createCategory=async(categoryData)=>{
        try{
            const category=await categoryModel.create(categoryData)
            return category
        }
        catch(e){
            console.log(e)
            return e
        }
    }
}

export default new categoryServices