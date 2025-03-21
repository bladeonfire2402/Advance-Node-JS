import cartServices from "../services/cartServices.js"

class cartController {
    AddToCart=async(req,res)=>{
        //Lấy id sản phẩm
        const cartItem = await cartServices.getCartItemByProductId(req.body._id);
        //Lấy id user
        const userCart= await cartServices.getUserCart(req.body.userId)
        console.log(userCart)
        if(!userCart){return res.status(500).json({message:"Không có giỏ hàng người dùng này"})}

        if(!cartItem){
            //tạo cartitem
            const newCartItem = await cartServices.createCartItem(req.body._id)
        
            //update vô cart
            const updatedCart = await cartServices.updateCart(req.body.userId,newCartItem._id,"add")
            return res.status(200).json({message:"Thêm sản phẩm vào giỏ hàng thành công",updatedCart})
        }
        else{
            //update +1 sp
            const updateQuantity=await cartServices.plusOneProduct(cartItem)
    
            return res.status(200).json({
                message:"Thêm sản phẩm thành công",
                updateQuantity
            })

        }
    }

    RemoveOneItem=async(req,res)=>{
        const cartItem = await cartServices.getCartItemByProductId(req.body._id);

        if(!cartItem){return res.status(500).json({message:"Lỗi không có SP này trong giỏ hàng"})}

        if(cartItem.quantity>1){
            const updateCartItem =await cartServices.minusOneProduct(cartItem)

            return res.status(200).json({message:"Giảm 1 SP",updateCartItem})
        }
        else if(cartItem.quantity==1){
            const deleteCartItem = await cartServices.deleteCartItem(req.body._id)

            console.log(deleteCartItem)
            const updatedCart =await cartServices.updateCart(req.body.userId,cartItem._id,"remove")

            return res.status(200).json({message:"Đã xóa SP khỏi giỏ hàng",updatedCart})
        }
    }

    //Xóa sạch sản phẩm khỏi giỏ hàng()
    EmptyCart=async()=>{
        
    }
}
export default new cartController