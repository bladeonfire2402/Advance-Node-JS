import categoriesServices from "../services/categoriesServices.js"
import imageServices from "../services/imageServices.js"
import productServices from "../services/productServices.js"

class productController{
    CreateProduct = async(req,res)=>{
        const { productName, price, description,categoryId,slug,imageUrl }= req.body 
        //Gởi thêm 1 trường slut để kiếm id của categories
        const id= await categoriesServices.getCategoryIdBySlug(slug)

        const productExist = await productServices.getProductByName(productName)
        if(productExist){return res.status(500).json({message:"Đã có sản phẩm trùng tên"})}

        //Upload ảnh lên cloundary
        const uploadImage =await imageServices.CreateCloudinaryUpload(req.file.buffer,productName)
        const image=uploadImage.result.url
    
        const product = await productServices.createProduct({
            ...req.body,
            categoryId:id,
            imageUrl:image
        })
    
        //Lúc này khi tạo xong product
        const updateCategory = await categoriesServices.updateCategoryProduct(id,product._id)
        if(!updateCategory){return res.status(200).json({message:"Lỗi rồi"})}

        return res.status(200).json({
            message:"Đã tạo SP thành công",
            product
        })
    }

    DeleteProduct=async(req,res)=>{
        const {id,categoryId}= req.body
        
        const productExist = await productServices.getProductById(id)
        if(!productExist){return res.status(500).json({message:"Sản phẩm đã xóa hoặc không tồn tại"})}
        
        //Xóa sp
        const deleteProduct = await productServices.deleteProduct(id)
        //Cập nhật category
        const removeProductInCateogry = await categoriesServices.removeProductInCategory(categoryId,id)

        return res.status(200).json({
            message:"Đã xóa sản phẩm thành công"
        })
    }

    //Lấy danh sách sản phẩm SP
    GetProducts= async(req,res)=>{
        const products= await productServices.getProductAll()

        if(!products || products.length==0){
            console.log("Chưa có sản phẩm nào được tạo")
        }

        return res.status(200).json({
            message:"Lấy dữ liệu sản phẩm thành công",
            products
        })
    } 

    //Update sản phẩm nhưng chưa sửa ảnh và trường category
    UpdateProduct = async(req,res) => {
        const { id,productName, price, description,status }= req.body

        const updateData = {};
        if (productName !== undefined) updateData.productName = productName;
        if (price !== undefined) updateData.price = price;
        if (description !== undefined) updateData.description = description;
        if(status!==undefined) updateData.status= status
        
        const product = await productServices.updateProduct(id,updateData)

        return res.status(200).json({
            message:"Đã cập nhật sản phẩm thành công",
            product
        })
    }

    GetProductById= async(req,res)=>{
        const product = await productServices.getProductById(req.body.id)

        return res.status(200).json({
            product
        })
    }

    //hàm test ảnh thôi
    uploadImage=async(req,res)=>{
        const id="mmmee";
        const upload= await imageServices.CreateCloudinaryUpload(req.file.buffer,id)

        
        console.log(upload)
        console.log("moimoi    "+ upload.result.url)
        console.log("bruh   "+upload.imageUrl)
        
        return res.status(200).json({upload
        })
    }
}
export default new productController