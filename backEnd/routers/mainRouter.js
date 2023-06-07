const router = require("express").Router();

const { mainInfo } = require("../controllers/mainControllers");

router.get("/",mainInfo);

module.exports = router;