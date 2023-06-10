const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();


// 에러나서 임시 코드 
// exports.islogin = async(req,res,next)=>{
//   console.log('islogin 미들웨어가 작동하는지 확인1🔮🔮🔮');
  
//   const authHeader = req.headers.authorization;
//   console.log("req.headers.authorization 확인" , req.headers.authorization)
//   console.log('islogin 미들웨어가 작동하는지 확인2🔮🔮🔮');
  
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     res.status(401).send("다시 로그인");
//     console.log('islogin 미들웨어가 작동하는지 확인3🔮🔮🔮');
//     return;
//   }
  
//   const token = authHeader.split(' ')[1];
//   console.log('islogin 미들웨어가 작동하는지 확인4🔮🔮🔮');
  
//   jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
//     if (err) {
//       console.log('islogin 미들웨어가 작동하는지 확인5🔮🔮🔮');
//       console.log("토큰 만료",err);
//       return res.status(401).send("다시 로그인");
//     } else {
//       console.log('islogin 미들웨어가 작동하는지 확인6🔮🔮🔮');
//       req.decode = decode;
//       next();
//     }
//   })
// }
  // [이렇게 하는 이유 by GPT]
    // 그러나 문제는, express의 req 객체는 미들웨어와 라우트 핸들러 간에 데이터를 전달하는데 사용됩니다. 즉, 한 요청-응답 주기 동안에만 유효합니다. 따라서 로그인 요청에서 req.session.access_token에 값을 설정한 후, 그 값이 다른 요청 (예를 들어, 게시글 작성 요청)에서 사용 가능하도록 유지되지 않습니다.
    // 이 문제를 해결하려면, 클라이언트가 로그인을 성공했을 때 발급받은 토큰을 저장하고, 이후의 모든 요청에 토큰을 포함하여 보내도록 해야 합니다. 토큰은 보통 Authorization 헤더를 통해 전송되며, "Bearer {토큰}" 형태로 전송됩니다.



// 동희님 코드 
exports.islogin = async(req,res,next)=>{
  console.log("dddd @isLogin.js");
  //값이 암호화된 토큰만 풀어주면 바로 사용가능
  //req.session 대신 쿠키값 읽기
  if (req.rawHeaders.filter(header => header.toLowerCase().includes('token')).length == 0) {
    console.log("여기? @isLogin.js");
    next();
  }else{

    const cookieString = req.rawHeaders.filter(header => header.toLowerCase().includes('token'));
    // console.log("totooto%%%",cookieString);
    const access_token = cookieString[0].split('=')[1];
    // 앍운 쿠키값 에서 token 해체 
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