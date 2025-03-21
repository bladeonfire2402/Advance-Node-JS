import authServices from "../services/authServices.js";
import cartServices from "../services/cartServices.js";
import userServices from "../services/userServices.js";
import { comparePwd, createAccessToken, createUniqueString, encodePwd } from "../utils/authentication/auth-utils.js";



class authController {
    signUp=async(req,res)=>{
        const {username,email,pwd}=req.body;

        //Đã có ng dùng này theo email
        const checkEmailExist = await userServices.getUserByEmail(email);
        if(checkEmailExist){return res.status(500).json({message:"Email này đã được đăng kí tài khoản"})}

        const hashedPwd = await encodePwd(pwd)

        //Tạo người dùng
        const newUser = await userServices.createUser({
            ...req.body,
            pwd:hashedPwd
        });

        //Tạo cart cho người dùng
        const cart = await cartServices.createCart(newUser._id)
        if(!cart){return res.status({message:"Lỗi không tạo được giỏ hàng"})}

        //Gửi email 
        const emailResult =  this.sendNotify(email,req)
        
        return res.status(200).json({
            message:"Tạo người dùng thành công",
            emailResult:emailResult,
            newUser
        })
    }

    signIn = async(req,res)=>{
        const {email,pwd}=req.body

        //Tìm tài khoản
        const User = await userServices.getUserByEmail(email);
        if(!User){return res.status(500).json({message:"Email này chưa đăng kí "})}

        //Kiểm tra pwd user nhập có đúng không
        const checkPwd= await comparePwd(pwd,User.pwd)
        if(!checkPwd){return res.status(500).json({message:"Password nhập sai rồi"})}

        User.pwd=undefined;// Dấu đi trường password
        
        const checkVerify = User.verified
        if(checkVerify==false){return res.status(500).json({message:"Tài khoản chưa xác thực"})}

        const checkBlock=User.block
        if(checkBlock==true){return res.status(500).json({message:"Bạn đã bị block khỏi trang"})}

        const accessToken=await createAccessToken(User._id)

        return res.status(200).json({
            message:"Đăng nhập thành công rồi",
            accessToken,
            User
        })
    }

    sendNotify =async(email,res)=>{
        //Tạo mã xác thực
        const uniqueString = createUniqueString()

        //Tạo nội dung thư
        const emailDetail =  authServices.createEmailDetails(uniqueString,email)

        //Lưu bản ghi xác thực
        const userVerification = await userServices.createUserVerification(email,uniqueString)

        //Tạo người vận chuyển email
        const transporter= authServices.createTransporter()

        //Gửi mail
        const isSend= await authServices.sendEmail(transporter,emailDetail)
        if(!isSend){return res.status(500).json({message:"Gửi mail thất bại"})}
        
        const result ="Đã gửi email thành công, vui lòng xác thực";

        return result
    }

    verifyAccount = async(req,res)=>{
        const {email,uniqueString}=req.body
        const userVerification = await userServices.getVerificationByEmail(email)
        //Kiểm tra xem người dùng verified chưa
        const user = await userServices.getUserByEmail(email)
        if(user.verified==true){res.status(500).json({message:"Người dùng đã verify rồi"})}

        if(userVerification.uniqueString==uniqueString){
            userServices.activeUser(email)
            return res.status(200).json({message:"Active account thành công"})
        }
        else
        {
            return res.status(500).json({message:"Mã xác thực không trùng"})
        }

    }

    resendEmail=async(req,res)=>{
        let {email}=req.body
        const currentDate = Date.now()
        const latestVertification = userServices.getVerificationByEmail(email)
        
        const user = userServices.getUserByEmail(email)
        if(user.verified==true){
            return res.status(500).json({
                message:"Người dùng đã kích hoạt tài khoản"
            })
        }

        if(currentDate<latestVertification.expriedAt){
            const timeToWait = latestVertification.expriedAt-currentDate / (1000 * 60)
            return res.status(500).json({
                message:`Vui lòng đợi thêm ${timeToWait} phút để gửi lại email`
            })
        }

        this.sendNotify(email,res)

        return res.status(200).json({message:"Đã gửi lại mã xác thực"})

    }

}

export default new authController