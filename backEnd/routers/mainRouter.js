const router = require("express").Router();

const { mainInfo } = require("../controllers/mainControllers");
const { islogin } = require("../middleware/isLogin");
const { mainloginaccess } = require("../controllers/mainControllers");

router.get('/',(req,res)=>{
  res.sendFile("/home/ubuntu/frontEnd/main.html");
});

// 메인화면 그려줄때 토큰으로 그려줘야되는데
// login 을 안하면 정보를 가져올수없다..

router.get("/hi",islogin,mainloginaccess,mainInfo);


module.exports = router;