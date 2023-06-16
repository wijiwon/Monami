const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();

exports.islogin = async(req,res,next)=>{
  // console.log("dddd");
  //값이 암호화된 토큰만 풀어주면 바로 사용가능
  //req.session 대신 쿠키값 읽기
  // console.log(req.rawHeaders,"여기 쿠키 헤더임 ");
  // console.log(req,"req");
  console.log("스토어",req.sessionStore.sesssion);
  console.log("스토어 안 세션",req.sessionStore);
  if (req.rawHeaders.filter(header => header.toLowerCase().includes('token')).length == 0) {
    next();
  }else{

    const cookieString = req.rawHeaders.filter(header => header.toLowerCase().includes('token'));

    const access_token = cookieString[0].split('=')[1];
    // 앍운 쿠키값 에서 token 해체 
    try {
      jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err,decode)=>{
        if (err) {
          console.log("Error when verifying token:", err);
          console.log("Token value:", access_token);
          console.log("ACCESS_TOKEN_KEY value:", process.env.ACCESS_TOKEN_KEY);

          console.log("Decoded token:", jwt.decode(access_token));
          
          return res.send("다시 로그인");
        }else{
          req.decode = decode;
          // console.log(decode);
          next();
        }
      })
    } catch (error) {
      console.log("islogin에러",error);
    }
  }
}