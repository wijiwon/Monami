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
    // 먼저, 현재 사용자를 찾습니다
    const currentUser = await User.findOne({where: {user_id : decode.user_id}});
    console.log("현 사용자",currentUser);
    if (!currentUser) {
      console.log("제공된 사용자 ID로 사용자를 찾을 수 없습니다");
      return res.json({message: "사용자를 찾을 수 없습니다"});
    }

    // 제출된 닉네임이 현재 닉네임과 같지 않은 경우, 중복 닉네임을 확인합니다
    if (nickName !== currentUser.username) {
      const existingUsername = await User.findOne({where: {username : nickName}});
      
      if (existingUsername) {
        console.log("마이 페이지 컨트롤러에서 닉네임 중복", nickName);
        return res.json({message: "중복된 닉네임입니다"});
      }
    }

    if (file) {
      console.log("파일 있졍",file);
      await User.update({username:nickName ,profile_img:"/img/"+file.filename},{where : {user_id : decode.user_id}})
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