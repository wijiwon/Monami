const router = require("express").Router();

const { mainloginaccess } = require("../controllers/mainControllers");
const { islogin } = require("../middleware/isLogin");

router.get('/',islogin,mainloginaccess);


module.exports = router;