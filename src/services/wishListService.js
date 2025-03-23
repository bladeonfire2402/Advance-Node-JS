import wishListModel from "../model/wishListModel.js"


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
            const wishList = await wishListModel.findOne({user:userId}).populate('wishes')

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
        const exists = wishes.some(wish => wish._id.toString() === productId.toString());

        return exists;
    }
}

export default new wishListServices