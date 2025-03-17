import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {v4 as uuidv4} from 'uuid'


function encodePwd(pwd) {
    try {
      const encoded = bcrypt.hash(pwd, 10);
      return encoded;
    } catch (error) {
      console.log(error);
      return false;
    }
}

const verifyToken = (token)=>{
  try {
    const SECRECT_KEY="BABYTHREE"
    const verifiedToken = jwt.verify(token,SECRECT_KEY)
    return verifiedToken
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return "token has exprired"
    } else {
      return {
        status:false,
        message:error.message
      }
    }
  }
}

const decodedToken=async(token)=>{
  try{
    const decoded = await jwt.decode(token);
    return decoded
  }
  catch(er){
    throw new Error(er)
  }
}

//So sánh mật khẩu
function comparePwd(dePwd, enPwd) {
  return bcrypt.compare(dePwd, enPwd);
}

//Tạo accessToken
function createAccessToken(id){
  dotenv.config()
  try{

    const SECRECT_KEY="BABYTHREE"

    const accessToken = jwt.sign({_id:id},SECRECT_KEY,{expiresIn:"20d"})

    return accessToken
  }
  catch(e){
    console.log(e);
    return false
  }
}

function createUniqueString(){
  try {
    const uniqueString=uuidv4().slice(0,6)
    return uniqueString
  }
  catch(e){
    console.log(e)
  }
}




export {encodePwd,comparePwd,createAccessToken,createUniqueString,decodedToken,verifyToken}