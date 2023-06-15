const router = require("express").Router();

const { logoutUser } =require("../controllers/loginController");


router.get("/",logoutUser);

module.exports = router;