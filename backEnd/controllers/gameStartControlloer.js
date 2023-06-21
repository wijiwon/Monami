const Sequelize = require("sequelize");

exports.gameStart = async(req,res)=>{
  try {
    const { decode } = req;
    if (decode) {
      return res.json({message:"게임 스타트"});
    }else{
      console.log("안돼");
      return res.json({message:"다시 로그인"});
    }
  } catch (error) {
    console.log("겜스타트 컨트롤 에러",error);
  }
}