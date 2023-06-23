const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();
const cookieParser = require('cookie-parser');

exports.islogin = async (req, res, next) => {
  console.log("Assign token to session", req.session.access_token);

  if (!req.session.access_token) {
    console.log("Token removed");
    // return res.status(401).send("토큰없음");
  } else {
    jwt.verify(req.session.access_token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
      if (err) {
        console.log("Token 유효검사 error middleware", err);
        // return res.send("다시 로그인 해주세요");
      } else {
        console.log("decoded", decode);
        req.decode = decode;
      }
    });
  }
  next();
};