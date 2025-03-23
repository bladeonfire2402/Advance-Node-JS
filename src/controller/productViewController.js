import productViewServices from "../services/productViewServices.js"

class ProductViewController{
    //admin
    getAllProductView= async(req,res)=>{
        const productViews = await productViewServices.getAll()
        if(!productViews){return res.status(500).json({message:"Chưa có bản ghi view nào"})}

        return res.status(200).json({
            message:"Lấy tất cả bản ghi views product thành công",
            productViews
        })
    }

    top4productView =async(req,res)=>{
        const productViews = await productViewServices.getTopView()
        if(!productViews){return res.status(500).json({message:"Chưa có bản ghi view nào"})}

        const topViews= productViews.slice(0,4)

        return res.status(200).json({
          message:"4 sản phẩm top views",
          topViews  
        })
    }

    getAllProductViewByProductId = async(req,res)=>{
        const {productId}=req.query

        const productViews = await productViewServices.getAllByProductId(productId)
        if(!productViews){return res.status(500).json({message:"Chưa có bản ghi view nào"})}

        return res.status(200).json({
            message:"Lấy tất cả bản ghi views product thành công",
            productViews
        })
    }

    plusOneView=async(req,res)=>{
        const {productId}=req.body
        //
        let productView;

        //Tìm kiếm xem có bản ghi view Product nào chưa
        productView = await productViewServices.getProductView(productId)
        if(!productView){productView = await productViewServices.createProductView(productId)}
           

        //Thêm 1 view cho sản phẩm
        const addView = await productViewServices.addOneView(productView)

        return res.status(200).json({
            message:"Thêm 1 view",
            addView
        })
    }
}

export default new ProductViewController