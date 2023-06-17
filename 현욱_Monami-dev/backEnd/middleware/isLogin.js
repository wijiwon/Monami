const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();

exports.islogin = async(req,res,next)=>{
  console.log("dddd");
  //값이 암호화된 토큰만 풀어주면 바로 사용가능
  //req.session 대신 쿠키값 읽기
  if (req.rawHeaders.filter(header => header.toLowerCase().includes('token')).length == 0) {
    console.log("여기?");
    next();
  }else{

    const cookieString = req.rawHeaders.filter(header => header.toLowerCase().includes('token'));
    console.log("totooto%%%",cookieString);
    // console.log("asdfdioasjflasdjflkasdf",cookieString);
  const access_token = cookieString[0].split('=')[1];
    // 앍운 쿠키값 에서 token 해체 
    try {
      jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err,decode)=>{
        if (err) {
          console.log("토큰 만료",err);
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