// const jwt = require("jsonwebtoken");
// const dot = require("dotenv").config();
// const cookieParser = require('cookie-parser');

// exports.islogin = async (req, res, next) => {
//   console.log("Assign token to session", req.session.access_token);

//   if (!req.session.access_token) {
//     console.log("Token removed");
//     // return res.status(401).send("토큰없음");
//   } else {
//     jwt.verify(req.session.access_token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
//       if (err) {
//         console.log("Token 유효검사 error middleware", err);
//         // return res.send("다시 로그인 해주세요");
//       } else {
//         console.log("decoded", decode);
//         req.decode = decode;
//       }
//     });
//   }
//   next();
// };

const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();

exports.islogin = async(req,res,next)=>{
  // console.log("dddd");
  //값이 암호화된 토큰만 풀어주면 바로 사용가능
  //req.session 대신 쿠키값 읽기
  if (req.rawHeaders.filter(header => header.toLowerCase().includes('token')).length == 0) {
    // console.log("여기?");
    next();
  }else{

    const cookieString = req.rawHeaders.filter(header => header.toLowerCase().includes('token'));

    // console.log("totooto%%%",cookieString);
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