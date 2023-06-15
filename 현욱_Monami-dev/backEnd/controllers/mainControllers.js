const e = require('express');
const Sequelize = require("sequelize");
const { User, Post } = require("../models");


// 게시판 랭킹 , 유저랭킹 함수
// 디코드 함수 가져오기
exports.mainloginaccess = async(req,res)=>{
  try{
    console.log(req);
    const { decode } = req;
    if (decode) {
      console.log("디디디디%^%^%^%^%^%^%^",decode);
      await User.findOne({
        where : {username : decode.name}
      }).then((e) => {
        res.send({  login: e });
      })
    }
  }
  catch(err){
    console.log(err);
  }
}
exports.mainInfo = async (req, res) => {
  try {
    // console.log("알이큐#$#$%#$%#$%",req);
    await User.findAll({
      raw: true,
      where: {
        joinAllow: {
          [Sequelize.Op.not]: 2
        }
      },
      order: [['exp', 'ASC']],
      limit: 5

    }
    ).then((user) => {
      // 내림차순 5개 가공
      Post.findAll({
        raw: true,
        order: [['createdAt', 'DESC']],
        limit: 5,
        where: {}
      }).then((posts) => {
        res.send({ user: user, posts: posts });
      })
    })

    // const { decode } = req;
    // if (decode) {
    //   console.log("디디디디%^%^%^%^%^%^%^",decode);
    //   const user = await User.findOne({
    //     where : {username : decode.name}
    //   })
      
    // //   if (user) {
        
    // //   }
    // //   res.json(user)
    // }

  } catch (error) {
    console.log("mainInfo 컨트롤 에러", error);
  }
}


