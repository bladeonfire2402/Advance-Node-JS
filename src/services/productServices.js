import productModel from "../model/productModel.js"


class productServices{
    getProductByName= async(name)=>{
        try {
            const product = productModel.findOne({productName:name}) 
            return product
        } catch (error) {
            console.log(error)
            return false
        }

    }

    getProductById= async(id)=>{
        try {
            const product = productModel.findOne({_id:id}) 
            return product
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getProductAll = async()=>{
        try{
            const products= await productModel.find().populate("categoryId")
            return products
        }
        catch(e){
            console.log("lỗi lấy dữ liệu")
            return false
        }
    }


    createProduct= async(productData)=>{
        try {
            const product= productModel.create(productData)
            return product
        } catch (error) {
            console.log(error)
            return false
        }
    }

    updateProduct= async(productId,newData)=>{
        try{
            const newProduct=await productModel.findByIdAndUpdate(productId,newData,{new:true, runValidators:true});

            return newProduct
        }
        catch(error){
            console.log(error)
            return false
        }
    }

    deleteProductById=async(productId)=>{
        try{
            const data=await productModel.findByIdAndDelete(productId);
            return data
        }catch(e){
            console.log(e)
            return false
        }
    }
}
export default new productServices