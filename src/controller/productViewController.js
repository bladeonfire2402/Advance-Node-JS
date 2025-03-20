import productViewServices from "../services/productViewServices"

class ProductViewController{
    getAllProductView= async(req,res)=>{
        const productViews = await productViewServices.getAll()
        if(!productViews){return res.status(500).json({message:"Chưa có bản ghi view nào"})}

        return res.status(200).json({
            message:"Lấy tất cả bản ghi views product thành công",
            productViews
        })
    }

    getAllProductViewByProductId = async(req,res)=>{
        const {productId}=req.body

        const productViews = await productViewServices.getAllByProductId(productId)
        if(!productViews){return res.status(500).json({message:"Chưa có bản ghi view nào"})}

        return res.status(200).json({
            message:"Lấy tất cả bản ghi views product thành công",
            productViews
        })
    }

    plusOneView=async(req,res)=>{
        const {productId}=req.body

        //Lấy ngày tháng năm hiện tại
        const current = new Date()
        const curDay= current.getDate
        const curMonth = current.getMonth
        const curYear = current.getFullYear

        //
        let productView;

        //Tìm kiếm xem có bản ghi view Product nào chưa
        productView = await productViewServices.getProductView(productId)
        if(!productView){productView = productViewServices.createProductView(productId)}

        const preProductViewDay=productView.created.getDate
        const preProductViewMonth=productView.created.getMonth
        const preProductViewYear=productView.created.getFullYear

        //Kiểm tra xem ngày bản ghi mới nhất được lưu với ngày hiện tại
        if(
            curDay!=preProductViewDay ||
            curMonth != preProductViewMonth ||
            curYear != preProductViewYear
        ){//Nếu không bằng nhau tạo 1 bản ghi mới
            productView = productViewServices.createProductView(productId)
        }

        //Thêm 1 view cho sản phẩm
        const addView = await productViewServices.addOneView(productView)

        return res.status(200).json({
            message:"Thêm 1 view",
            addView
        })
    }
}

export default new ProductViewController