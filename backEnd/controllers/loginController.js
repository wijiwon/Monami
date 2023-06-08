const Sequelize = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async(req,res)=>{
  try {
    const { user_id, user_pw } = req.body.data;
    const data = await User.findOne({where : {user_id}})

    if (data == null) {
      return res.json({message:"회원가입 한 아이디 없음"});
    }
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
      req.session.access_token = token;
      
      res.send({message : "로그인완",userInfo:data, token:req.session.access_token});

    }else{
      return res.json({message:"비밀번호 틀림"});
    }
  } catch (error) {
    console.log(error);
  }
}