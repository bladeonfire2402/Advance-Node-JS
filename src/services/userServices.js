import userModel from "../model/userModel.js"
import userModelVerfication from "../model/userModelVerfication.js";
import { decodedToken } from "../utils/authentication/auth-utils.js";


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

    getUserById = async(id)=>{
        try{
            const user =await userModel.findById(id)
            return user
        }
        catch(e){
            throw new Error(e)
        }
    }

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

    updateUser = async(email,newInfo)=>{
        try{
            const user = await userModel.findOneAndUpdate(email,{
                username:newInfo.username,
                pwd:newInfo.pwd
            },{new:true,runValidators:true})

            return user
        }
        catch(e){
            console.log(e)
            return false
        }
    }

    //Chuyển từ token về user
    decodedUser = async(token)=>{
        try{
            const user= await decodedToken(token)
            
            return user
        }
        catch(e){
            throw new Error(e)
        }
    }
    
}

export default new userServices