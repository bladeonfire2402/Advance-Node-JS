
import producViewModel from "../model/producViewModel.js"

class ProductViewServices{
    getAll= async()=>{
        try {
            const productViews = await producViewModel.find().populate({path:"product"})
            return productViews
        } catch (error) {
            throw new Error("Lỗi fetching dữ liệu");   
        }
    }

    getTopView =async()=>{
        try {
            const productViews = await producViewModel.find().populate({path:"product"}).sort({views:-1})
            return productViews
        } catch (error) {
            throw new Error("Lỗi fetching dữ liệu");   
        }
    }

    getAllByProductId= async(productId)=>{
        try {
            const productViews = await producViewModel.find({product:productId})
            return productViews
        } catch (error) {
            throw new Error("Lỗi fetching dữ liệu");   
        }
    }

    getProductView = async(productId)=>{
        try {
            //lấy prodview Mới nhất
            const productView = await producViewModel.findOne({product:productId}).sort({_id:-1})

            return productView
            
        } catch (error) {
            throw new Error(error)
        }
    }    


    createProductView=async(productId)=>{
        try {
            const productView = await producViewModel.create({
                product:productId,
                views:0,
            })   

            return productView
            
        } catch (error) {
            throw new Error(error)
        }
    }

    addOneView  = async(productView)=>{
        try {
            const preView = productView.views;

            productView.views=preView+1;

            await productView.save()

            return productView
            
        } catch (error) {
           throw new Error(error)   
        }
    }
}

export default new ProductViewServices