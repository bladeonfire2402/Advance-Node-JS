import nodemailer from 'nodemailer'

class authService {
    createTransporter=()=>{
        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: process.env.EMAIL_ACC,
                pass:process.env.EMAIL_PASS,
              }
          })
        
          transporter.verify((error)=>{
            if(error){
             console.log(error)
            }
            else{
             console.log("Sẵn sàng để gửi email")
            }
         })

         return transporter
    }

    createEmailDetails=(uniqueString,email)=>{
       //Tạo Nội dung mail
         const mailOptions={
           from:process.env.EMAIL_ACC,
           to:email,
           subject:"Mã xác thực tài khoản của bạn",
           text:`Mã xác thực của bạn là đây ${uniqueString}`,
           html:`
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 500px; margin: auto;">
                <h1 style="color: #2d89ef; text-align: center;">Xác thực tài khoản</h1>
                <p>Chào bạn,</p>
                <p>Bạn vừa yêu cầu xác thực tài khoản. Dưới đây là mã xác thực của bạn:</p>
                <div style="background-color: #f2f2f2; padding: 10px; font-size: 18px; font-weight: bold; text-align: center; border-radius: 5px;">
                    ${uniqueString}
                </div>
                <p>Vui lòng nhập mã này vào trang xác thực để hoàn tất quá trình.</p>
                <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
                <p style="margin-top:5px">Trân trọng,<br><strong>Đội ngũ hỗ trợ Hasaki</strong></p>
            </div>
           `
          }
        return mailOptions
    }

    sendEmail=async(transporter,mail)=>{
        try{
            const sendMail = await transporter.sendMail(mail);

            return sendMail

        }
        catch(e){
            console.log(e);
            return false
        }
    }

}

export default new authService