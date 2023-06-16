const Sequelize = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async(req,res)=>{
  try {
    const { user_id, user_pw } = req.body.data;
    const data = await User.findOne({where : {user_id, joinAllow: [1,2] } });
    const data2 = await User.findOne({where : {user_id } });
    if (data2 == null) {
      return res.json({message:"회원가입 한 아이디 없음"});
    }
    if (!data) {
      return res.json({message:"로그인할 수 없습니다 (승인대기중)"});
    }
    // if (condition) {
      
    // }
    const same = bcrypt.compareSync(user_pw,data.user_pw);
    if (same) {
      // 로그인 성공시 토큰 발급
      const token = jwt.sign({
        id : data.id,
        name : data.username,
        user_id : data.user_id,
        profile_img : data.profile_img,
        experience : data.exp,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn : "60m"
      })
      console.log("Generated token:",token);
      
      // express-session과 같은 세션 미들웨어를 사용하면 사용자의 브라우저에 저장된 쿠키를 사용하여 세션을 식별합니다.
      // 세션에 저장할거면 
      // sessionStorage.setItem("key", "value"); 이렇게 써줘야 한다

      req.session.access_token = token;
      
      if (user_id == "admin") {
        res.send({message : "어드민",userInfo:data, token:req.session.access_token});
      } else {
        res.send({message : "로그인완",userInfo:data, token:req.session.access_token});
      }


    }else{
      return res.json({message:"비밀번호 틀림"});
    }
  } catch (error) {
    console.log(error);
  }
}

exports.logoutUser = async(req, res) => {
  try {
      req.session.destroy((err) => {
          if(err) {
              console.log(err);
              return res.json({message:"로그아웃 실패"});
          }
          
          res.clearCookie('connect.sid');  
          // connect.sid는 express-session에서 기본으로 사용하는 세션 쿠키 이름입니다.
          res.send({message : "로그아웃 완료"});
      });
  } catch (error) {
      console.log(error);
      return res.json({message:"서버 오류"});
  }
};