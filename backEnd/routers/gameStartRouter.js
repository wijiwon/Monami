const router = require("express").Router();
const { islogin } = require("../middleware/isLogin");
const { gameStart } = require("../controllers/gameStartControlloer");

router.get('/', islogin, gameStart);

module.exports = router;