const router = require("express").Router();
const { islogin } = require("../middleware/isLogin");

router.get('/', islogin, (req, res) => {
  // 인증된 사용자에게만 접근이 허용됩니다.
  res.sendFile("/home/ubuntu/frontEnd/game.html");
});

module.exports = router;