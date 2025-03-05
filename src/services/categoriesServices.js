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