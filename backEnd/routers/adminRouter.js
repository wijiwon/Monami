const router = require("express").Router();
const { adminInfo,adminAllow } = require("../controllers/adminControllers");

router.get('/',adminInfo);
router.post('/',adminAllow);

module.exports = router;