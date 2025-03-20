import wishListService from "../services/wishListService"
import userServices from "./userServices"

class WishListController {
    AddToWishList = async(req,res)=>{
        const { userId, productId}= req.body
        //Kiểm tra xem người dùng tồn tại không
        const user = await userServices.getUserById(userId)
        if(!user){return res.status(500).json({message:"Không có người dùng"})}

        //Kiếm wishList người dùng
        let wishList = await wishListService.getWishList(userId)
        if(!wishList){wishList=await wishListService.createWishList(userId)}

        //Kiểm tra xem có sản phẩm này trong wishList chauw 
        const checkWish= wishListService.checkWishExist(productId,wishList.wishes)
        if(checkWish==true){return res.status(500).json({message:"Đã tồn tại sản phẩm này trong wishList"})}


        //Thêm sản phẩm vào wishList
        const addwishList= await wishListService.addToWishList(userId,productId)

        return res.status(200).json({
            message:"Thêm sản phẩm vào danh sách yêu thích",
            addwishList
        })
    }

    RemoveFromWish = async(req,res)=>{
        const { userId, productId}= req.body
        //Kiểm tra xem người dùng tồn tại không
        const user = await userServices.getUserById(userId)
        if(!user){return res.status(500).json({message:"Không có người dùng"})}

        //Kiếm wishList người dùng
        let wishList = await wishListService.getWishList(userId)
        if(!wishList){wishList=await wishListService.createWishList(userId)}

        //Kiểm tra xem có sản phẩm này trong wishList chauw 
        const checkWish= wishListService.checkWishExist(productId,wishList.wishes)
        if(checkWish==true){return res.status(500).json({message:"Đã tồn tại sản phẩm này trong wishList"})}


        //Thêm sản phẩm vào wishList
        const addwishList= await wishListService.addToWishList(userId,productId)

        return res.status(200).json({
            message:"Thêm sản phẩm vào danh sách yêu thích",
            addwishList
        })
    }
}

export default new WishListController