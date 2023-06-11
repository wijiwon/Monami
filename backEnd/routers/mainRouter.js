const router = require("express").Router();

const { mainInfo } = require("../controllers/mainControllers");
const { islogin } = require("../middleware/isLogin");

<<<<<<< HEAD
router.get("/",islogin,mainInfo);
=======
router.get("/",mainInfo);
>>>>>>> jiwon


module.exports = router;