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

    getChagre=async(chargeId)=>{
        try {
            const charge= await chargeModel.findById(chargeId)

            return charge
            
        } catch (error) {
            throw new Error(error)
        }
    }

    createWallet=async(userId)=>{
        try {
            const wallet = await walletModel.create({
                user:userId
            })

            return wallet
            
        } catch (error) {
            throw new Error(error);
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

    addPoint = async (wallet, point) => {
        try {
            const prePoint = Number(wallet.points); // Ép kiểu đảm bảo
            const addPoint = Number(point); // Ép kiểu đảm bảo
    
            if (isNaN(addPoint)) {
                throw new Error(`Point value is not a number: ${point}`);
            }
    
            wallet.points = prePoint + addPoint;
    
            await wallet.save();
    
            return wallet;
    
        } catch (error) {
            throw new Error(error);
        }
    }

    chargeWallet = async(wallet,chargePoint)=>{
        try {
            const prePoint = Number(wallet.points); // Ép kiểu đảm bảo
            const charge = Number(chargePoint); 

            if (isNaN(charge)) {
                throw new Error(`Point value is not a number: ${point}`);
            }

            wallet.points=prePoint-charge
            
            await wallet.save()

            return wallet
            
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
            console.log(error)
            throw new Error(error)
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