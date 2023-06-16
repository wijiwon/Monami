const router = require("express").Router();

const { mainInfo } = require("../controllers/mainControllers");
const { islogin } = require("../middleware/isLogin");

router.get('/',(req,res)=>{
  res.sendFile("/home/ubuntu/frontEnd/main.html");
});


router.get("/hi",islogin,mainInfo);


module.exports = router;