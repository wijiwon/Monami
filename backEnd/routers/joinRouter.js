const router = require("express").Router();
const { joinUser } = require("../controllers/joinControllers");

router.post("/",joinUser);

module.exports = router;