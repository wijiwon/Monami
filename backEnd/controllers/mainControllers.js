const Sequelize = require("sequelize");
const { User, Post } = require("../models");


// 게시판 랭킹 , 유저랭킹 함수
exports.mainInfo = async(req,res,next)=>{
  try {
    await User.findAll({raw:true,where : {}}).
    then((user)=>{
      // 내림차순 5개 가공
      Post.findAll({
        raw :true,
        order : [['createdAt','DESC']],
        limit : 5,
        where: {}
      }).then((posts)=>{
        res.send({user : user, posts :posts});
        next();
      })
    })
  } catch (error) {
    console.log("mainInfo 컨트롤 에러",error);
  }
}


