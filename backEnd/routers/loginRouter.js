const router = require("express").Router();
const { loginUser } = require("../controllers/loginController");

router.post('/',loginUser);

module.exports = router;