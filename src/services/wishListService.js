import wishListModel from "../model/wishListModel"


class wishListServices{
    createWishList=async(userId)=>{
        try {
            const wishList = await wishListModel.create({user:userId,wishes:[]})
            return wishList

        } catch (error) {
            throw new Error(error)
        }
    }
    
    getWishList = async(userId)=>{
        try {
            const wishList = await wishListModel.findOne({user:userId})

            return wishList
        } catch (error) {
            throw new Error(error)
            
        }
    }

    addToWishList = async(userId,productId)=>{
        try {
            const wishList = await wishListModel.findOneAndUpdate({user:userId},{
                $addToSet:{wishes:productId}
            })

            return wishList
            
        } catch (error) {
            throw new Error(error);
        }
    }

    removeFromList=async(userId,productId)=>{
        try {
            const newCart=await wishListModel.findOneAndUpdate({user:userId},{
                $pull:{
                    wishes:productId
                }
            },{new:true})
            return newCart
            
        } catch (error) {
            throw new Error(e)   
        }

    }

    checkWishExist=(productId, wishes)=>{
        for(var i=0;i<wishes;i++){
            if(productId==wishes[i]){
                return true
            }
        }
        return false
    }
}

export default new wishListServices