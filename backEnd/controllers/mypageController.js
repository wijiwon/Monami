const { raw } = require('express');
const multer = require('multer');
const path = require("path");
const { User } = require("../models");

exports.mypage = async(req,res)=>{
  try {
    // console.log(req);
    const {decode} = req;
    // console.log("123123123",decode);
    if (decode) {
      await User.findOne({
        raw : true,
        where : {user_id : decode.user_id}
      }).then((e) => {
        res.send({  login: e });
      })
    }
    
  } catch (error) {
    console.log(error);
  }
}

exports.postImg = multer({
  storage : multer.diskStorage({

    destination: (req,file,fin)=>{
      fin(null,"image/")
    },

    filename : (req,file,fin)=>{
      const ext = path.extname(file.originalname);

      const filename = path.basename(file.originalname,ext) + "_" + Date.now() + ext;

      fin(null,filename);
    }
  }),

  limits : {fieldSize : 5 * 1024 *1024},
})

exports.imgUpdate = async(req,res)=>{
  const {file,decode} = req;
  const {nickName,upload} = req.body;
  // console.log(req);
  console.log("업로듕",upload);
  try {
    const existingUsername = await User.findOne({where: {username : nickName}});

    if (existingUsername) {
      console.log("마이페이지 컨트롤러 중복닉네임있음",nickName);
      return res.status(400).json({message: "사용중인 닉네임 입니다"});
    }

    if (file) {
      console.log("파일 있졍",file);
      await User.update({username:nickName ,profile_img:"http://127.0.0.1:4000/img/"+file.filename},{where : {user_id : decode.user_id}})
    }else{
      console.log("뭔디",decode.profile_img);
      await User.update({username:nickName ,profile_img:upload},{where : {user_id : decode.user_id}})
    }
    await User.findOne({raw:true,where : {user_id : decode.user_id}}).then((e)=>{
      res.send({login:e});
    });
    
  } catch (error) {
    console.log("업로드 에러",error);
  }
}