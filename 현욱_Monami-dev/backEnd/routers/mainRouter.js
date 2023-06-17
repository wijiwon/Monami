const router = require("express").Router();

const { mainInfo } = require("../controllers/mainControllers");
const { islogin } = require("../middleware/isLogin");

router.get("/",islogin,mainInfo);


module.exports = router;