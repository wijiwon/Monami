const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();

exports.islogin = async(req,res,next)=>{
  const { access_token } = req.session;

  try {
    jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err,decode)=>{
      if (err) {
        console.log("토큰 만료",err);
        return res.send("다시 로그인");
      }else{
        req.decode = decode;
        next();
      }
    })
  } catch (error) {
    console.log(error);
  }
}