const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();

exports.islogin = async(req,res,next)=>{
  //값이 암호화된 토큰만 풀어주면 바로 사용가능
  //req.session 대신 쿠키값 읽기
  console.log(req);
  // console.log(req.rawHeaders[29]);
  const cookieString = req.rawHeaders[29];
  // const cookieString = document.cookie;
  const access_token = cookieString.split('=')[1];
  // const { access_token } = token
  // console.log("asdfasdf",access_token);
  
  // 앍운 쿠키값 에서 token 해체 
  try {
    jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err,decode)=>{
      if (err) {
        console.log("토큰 만료",err);
        return res.send("다시 로그인");
      }else{
        req.decode = decode;
        console.log(decode);
        next();
      }
    })
  } catch (error) {
    console.log(error);
  }
}