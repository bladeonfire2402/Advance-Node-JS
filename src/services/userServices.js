import userModel from "../model/userModel.js"
import userModelVerfication from "../model/userModelVerfication.js";
import { decodedToken } from "../utils/authentication/auth-utils.js";


class userServices {
    //Lấy tất cả người dùng
    getUsers = async()=>{
        try {
            const users = await userModel.find()

            return users
            
        } catch (error) {
            throw new Error(error)
        }
    }


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
                phone:newInfo.phone
            },{new:true,runValidators:true})

            return user
        }
        catch(e){
            console.log(e)
            return false
        }
    }

    updateUserBruh = async (email, newInfo) => {
        try {
            // Tạo đối tượng cập nhật, chỉ thay đổi các trường không rỗng
            const updateData = {};
    
            // Kiểm tra nếu username không phải chuỗi rỗng thì mới cập nhật
            if (newInfo.fullname !== "") {
                updateData.fullname = newInfo.fullname;
            }
    
            // Kiểm tra nếu phone không phải chuỗi rỗng thì mới cập nhật
            if (newInfo.phone !== "") {
                updateData.phone = newInfo.phone;
            }
    
            // Nếu không có gì thay đổi, trả về false
            if (Object.keys(updateData).length === 0) {
                return false;
            }
    
            // Cập nhật chỉ với các trường đã thay đổi
            const user = await userModel.findOneAndUpdate(
                { email: email },
                updateData,
                { new: true, runValidators: true }
            );
    
            return user;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    

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