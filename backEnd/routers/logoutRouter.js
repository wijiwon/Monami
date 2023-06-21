const router = require("express").Router();

const { logoutUser } =require("../controllers/loginController");


router.post("/",logoutUser);

module.exports = router;