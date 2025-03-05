import userModel from "../model/userModel.js"
import userModelVerfication from "../model/userModelVerfication.js";


class userServices {
    createUser = async (userData)=>{
        try{
            const user= await userModel.create(userData);
            return user
        }
        catch(error){
            throw new Error(error);
        }
    }

    getUserByEmail = async (email) => {
        try {
            const user = await userModel.findOne({email:email});
            return user;
        } catch (e) {
            console.log("Không tìm thấy người dùng");
            return false
        }
    };

    activeUser = async (email) =>{
        try{
            const user = await userModel.findOneAndUpdate(
                {email:email},
                {$set:{verified:true}}
            )

            return true
        }
        catch(e){
            console.log(e);
            return false
        }

    }
    createUserVerification = async(email,uniqueString)=>{
        try{
            const userVerification = await userModelVerfication.create({email,uniqueString})

            return userVerification
        }
        catch(e){
            console.log(e);
            return false
        }
    }

    getVerificationByEmail = async (email) => {
        try {
            //Tìm kiếm bản ghi mới nhất
            const userVerification = await userModelVerfication.findOne({email:email}).sort({_id:-1});
            return userVerification;
        } catch (e) {
            console.log("Không tìm thấy người dùng");
            return false
        }
    };

    

    
    
}

export default new userServices