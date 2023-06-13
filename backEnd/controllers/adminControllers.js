const Sequelize = require("sequelize");
const { User } = require("../models");

exports.adminInfo = async(req,res)=>{
  try {
    await User.findAll({
      raw: true,
      where: {
        joinAllow: 0,
      },
      attributes: ['user_id', 'username', 'joinAllow'],
      order: [['createdAt', 'DESC']],
    }
    ).then((users) => {
        res.send({users});
    })
  } catch (error) {
    console.log(error);
  }
}

exports.adminAllow = async(req,res)=>{
  try {
    console.log(req.body.data);
    const { user_info } = req.body.data;
    const user_id = user_info.user_id;
    await User.update({joinAllow :1 },{where : {user_id}});

    res.sendStatus(200);
  } catch (error) {
    console.log("수락 오류 컨트롤러",error);
  }
}