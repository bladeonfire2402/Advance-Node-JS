import userServices from "../services/userServices.js"
import { encodePwd,decodedToken, verifyToken } from "../utils/authentication/auth-utils.js"

class userController { 
    getAllUser = async(req, res)=>{
        const users = await userServices.getUsers()
        if(!users || users.length==0 ){return res.status(500).json({message:"Chưa có người dùng nào"})}

        return res.status(200).json({
            message:"Lấy danh sách người dùng thành công",
            users
        })
    }


    getUserInfoByToken = async(req,res)=>{
        //Kiểm tra coi có lỗi token ko
        const token = req.query.token;
        const data = verifyToken(token)

        if(data.status==false){return res.status(500).json({
            message:`${data.message}`,  
            
        })}
        //Tìm kiếm người dùng
        const user = await userServices.getUserById(data._id);
        return res.status(200).json({
            message:"Đã giải mã token",
            user
        })
    }

    getUserInfo=async(req,res)=>{
        const user = userServices.getUserByEmail(req.body.email)

        return res.status(200).json({
            user
        })
    }

    updateUserInfo = async(req,res)=>{
        // Mã hóa pwd mới
        const hashedPwd = await encodePwd(req.body.pwd)

        let newInfo={
            username:req.body.username,
            pwd:hashedPwd
        }
        const user= userServices.getUserByEmail(req.body.email,newInfo)

        return res.status(200).json({
            message:"Đã update người dùng",
            user
        })
    }
}

export default new userController