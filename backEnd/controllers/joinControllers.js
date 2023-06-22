const Sequelize = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.joinUser = async(req,res)=>{
  try {
    
    const { user_id, user_pw, username } = req.body.data;
    const user = await User.findOne({where : {user_id}})
    const usernamecheck = await User.findOne({where : {username}});
    if (user !== null) {
      console.log(user_id,"중복된 아이디");
      return res.json({message:"중복된 아이디 입니다"});
    }

    if (usernamecheck !== null) {
      console.log(username,"중복된 닉네임");
      return res.json({message: "중복된 닉네임입니다"})
    }
    
    // 정규식
    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    // if (!passwordRegex.test(user_pw)) {
    //   console.log("비밀번호 정규식 아님");
    //   return res.json({message:"비밀번호 정규식 아님"})
    // }

    const hash = bcrypt.hashSync(user_pw, 10);

    const adminHash = bcrypt.hashSync("admin123", 10);

    const adminUser = await User.findOne({where : {user_id :"admin"}})
    if (!adminUser) {
      console.log("어드민 계정 만든다");
      User.create({
        username:"admin",
        user_id:"admin",
        user_pw : adminHash,
        profile_img : "/img/sample.gif",
        exp : 0,
        joinAllow : 2,
      })
    }

    await User.create({
      username,
      user_id,
      user_pw : hash,
      profile_img : "/img/monami.png",
      exp : 0,
      joinAllow : 0,
    })

    res.send("완료")

  } catch (error) {
    console.log("회원가입 컨트롤러 오류",error);
  }
}