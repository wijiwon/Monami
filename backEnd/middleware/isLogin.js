const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();
const cookieParser = require('cookie-parser');

exports.islogin = async (req, res, next) => {
  // const access_token = req.cookies.token;
  // console.log("dddd");
  //값이 암호화된 토큰만 풀어주면 바로 사용가능
  //req.session 대신 쿠키값 읽기
  // console.log(req.rawHeaders,"여기 쿠키 헤더임 ");
  // console.log(req,"req");
  console.log("스토어", req.sessionStore.sesssion);
  console.log("스토어 안 세션", req.sessionStore);
  console.log(req.session.access_token);
  jwt.verify(req.session.access_token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
    if (err) {
      console.log("Error when verifying token:", err);
      console.log("Token value:", req.session.access_token);
      console.log("ACCESS_TOKEN_KEY value:", process.env.ACCESS_TOKEN_KEY);


      return res.send("다시 로그인");
    } else {
      console.log("이거 나오면 서ㅏㅂ질한거임",decode);
      req.decode = decode;
      console.log("Decoded token:", jwt.decode(req.session.access_token));
      // console.log(decode);
      next();
    }
  })
  if (req.rawHeaders.filter(header => header.toLowerCase().includes('token2')).length == 0) {
    next();
  } else {


    const cookieString = req.rawHeaders.filter(header => header.toLowerCase().includes('token2'));

    const access_token = cookieString[0].split('=')[1];
    // 앍운 쿠키값 에서 token 해체 
    try {
      jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
        if (err) {
          console.log("Error when verifying token:", err);
          console.log("Token value:", access_token);
          console.log("ACCESS_TOKEN_KEY value:", process.env.ACCESS_TOKEN_KEY);


          return res.send("다시 로그인");
        } else {
          req.decode = decode;
          console.log("Decoded token:", jwt.decode(access_token));
          // console.log(decode);
          next();
        }
      })
    } catch (error) {
      console.log("islogin에러", error);
    }
  }

}


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IjEyMyIsInVzZXJfaWQiOiIxMjMiLCJwcm9maWxlX2ltZyI6Imh0dHA6Ly8xMjcuMC4wLjE6NDAwMC9pbWcvbW9uYW1pLnBuZyIsImV4cGVyaWVuY2UiOjAsImlhdCI6MTY4Njg4ODc0NCwiZXhwIjoxNjg2ODkyMzQ0fQ.giSvIz5RzPsnP4U4x6jaMVh2ct6jJn4fssFCMFNfIUc



// s:-UI_VtqCZ56CNmlUKGXXKi6XGLAmEyDF.5BfnvWtNjoks/BmQfvVYJoiYpSsaWvNsFOStJLmvRY4