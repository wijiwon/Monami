const router = require("express").Router();
const { adminInfo,adminAllow } = require("../controllers/adminControllers");

router.get('/',(req,res)=>{
  res.sendFile("/home/ubuntu/frontEnd/admin.html");
});

router.get('/hi',adminInfo);
router.post('/',adminAllow);

module.exports = router;