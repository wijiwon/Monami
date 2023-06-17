const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();
const cookieParser = require('cookie-parser');

exports.islogin = async (req, res, next) => {
  console.log("세션에 토큰임당",req.session.access_token);

  // 무헌이 오빠가 만든 기적의 코드^^
  // 유효검사
  if (!req.session.access_token) {
    console.log("토큰 없졍");
    // return res.status(401).send("토큰 없어");
    req.isAuthenticated = false;
  }else {
    jwt.verify(req.session.access_token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
      if (err) {
        console.log("토큰 유효검사 에러 미들웨어임", err);
        // return res.send("다시 로그인 해주세욥");
        req.isAuthenticated = false;
        
      } else {
        console.log("디코드 됨",decode);
        req.decode = decode;
        
        req.isAuthenticated = true;
      }
    })
  }
  next();
  
  
}
