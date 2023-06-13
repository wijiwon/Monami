const router = require("express").Router();
const {mypage, postImg, imgUpdate} = require("../controllers/mypageController");
const { islogin } = require("../middleware/isLogin");

router.get('/',islogin,mypage);
router.post("/",postImg.single("upload"),islogin,imgUpdate);
module.exports = router;