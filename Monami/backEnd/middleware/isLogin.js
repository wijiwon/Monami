const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();



// 동이님 코드 
exports.islogin = async(req,res,next)=>{

  console.log("dddd @isLogin.js");
  //값이 암호화된 토큰만 풀어주면 바로 사용가능
  //req.session 대신 쿠키값 읽기
  if (req.rawHeaders.filter(header => header.toLowerCase().includes('token')).length == 0) {
    console.log("여기? @isLogin.js");
    
    // req.decode = decode;
      // ⭐⭐⭐ 이거 추가 


    next();


  }else{

    const cookieString = req.rawHeaders.filter(header => header.toLowerCase().includes('token'));
    // console.log("totooto%%%",cookieString);
    const access_token = cookieString[0].split('=')[1];
    // 앍운 쿠키값 에서 token 해체 
    console.log(access_token)
    try {
      jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err,decode)=>{
        if (err) {
          // console.log("토큰 만료",err);
          return res.send("다시 로그인");
        }else{
          req.decode = decode;
          console.log("decode 생성 확인 @isLogin.js");
          next();
        }
      })
    } catch (error) {
      console.log("islogin에러",error);
    }
  }
}



// exports.islogin = async(req,res,next) => {
//   console.log("dddd @isLogin.js");

//   const tokenHeader = req.rawHeaders.find(header => header.toLowerCase().includes('token'));
  
//   if (!tokenHeader) {
//     console.log("No token provided. @isLogin.js");
//     next();
//   } else {
//     const access_token = tokenHeader.split('=')[1];
//     console.log(access_token);

//     try {
//       jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
//         if (err) {
//           console.log("Token verification failed.", err);
//           return res.send("Please log in again.");
//         } else {
//           req.decode = decoded;
//           console.log("Decoded token created @isLogin.js");
//           next();
//         }
//       })
//     } catch (error) {
//       console.log("Error in islogin", error);
//     }
//   }
// }
