import chargeModel from "../model/chargeModel.js"
import walletModel from "../model/walletModel.js"

class walletServices{
    getWallet = async(userId)=>{
        try{
            const wallet = await walletModel.findOne({
                user:userId
            }).populate('chargeList')

            return wallet
        }
        catch(e){
            return false
        }
    }

    createWallet=async(userId)=>{
        try {
            const wallet = await walletModel.create({
                user:userId
            })

            return wallet
            
        } catch (error) {
            throw new Error(error)
        }
    }

    //Yêu cầu nạp tiền 
    createRecharge = async(chargeData)=>{
        try{
            const charge = await chargeModel.create({
                user:chargeData.userData,
                point:chargeData.chargePoint
            })

            return charge
        }
        catch(e){
            throw new Error(e)
        }
    }

    addPoint=async(walletId,point)=>{
        try {
            const walletadd = walletModel.findById({})
            
        } catch (error) {
            throw new Error(error)
        }
    }

    updateChargeSuccess=async(chargeId)=>{
        try {
            const charge = await chargeModel.findByIdAndUpdate(chargeId,{
                paymentStatus:"Successful"
            })

            return charge
            
        } catch (error) {
            throw new Error(e)
        }
    }

    updateHistoryCharge=async(walletId,chargeId)=>{
        try {
            const wallet = await walletModel.findByIdAndUpdate(walletId,{
                $addToSet:{
                    chargeList:chargeId
                }
            })

            return wallet
            
        } catch (error) {
           throw new Error(error)
        }
    }
}

export default new walletServices