const router = require('express').Router();
const { islogin } = require('../middleware/isLogin')

router.get('/',(req,res)=>{
  res.sendFile("/home/ubuntu/frontEnd/game.html");
});

// router.get("/hi");
// get : 이 주소로 써주세요 youdonghee.shop/admin/hi 



module.exports = router;