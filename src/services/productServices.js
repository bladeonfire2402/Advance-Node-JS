import productModel from "../model/productModel.js"


class productServices{
    getProductByName= async(name)=>{
        try {
            const product =await productModel.findOne({productName:name}) 
            return product
        } catch (error) {
            console.log(error)
            return false
        }

    }

    getProductById= async(id)=>{
        try {
            const product = await productModel.findOne({_id:id}) 
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
            const product=await productModel.create(productData)
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

    deleteProduct=async(productId)=>{
        try{
            const deletePro = await productModel.deleteOne({_id:productId})

            
            return true
        }
        catch(e){
            console.log(e)
        }
    }
    

    deleteProductById=async(productId)=>{
        try{
            const data=await productModel.findByIdAndDelete(productId);
            
            const result={data,message:"Đã xóa thành công"}
            return result
        }catch(e){
            console.log(`Lỗi  là ${e}`);
            return false
        }
    }
}
export default new productServices