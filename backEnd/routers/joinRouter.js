const router = require("express").Router();
const { joinUser } = require("../controllers/joinControllers");
const {islogin } = require("../middleware/isLogin");

router.get('/',(req,res)=>{
  res.sendFile("/home/ubuntu/frontEnd/join.html");
});


router.post("/",joinUser);

module.exports = router;