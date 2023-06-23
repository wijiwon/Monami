const router = require("express").Router();
const { joinUser } = require("../controllers/joinControllers");
const {islogin } = require("../middleware/isLogin")
router.post("/",joinUser);

module.exports = router;