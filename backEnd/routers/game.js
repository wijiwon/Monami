const router = require('express').Router();
const { islogin } = require('../middleware/isLogin')
const {isRoom} =require("../middleware/isRoom")
const { DrawingAdd, viewVideo,getUserinfo } = require('../controllers/gamePlay')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', islogin, isRoom, upload.single('file'), DrawingAdd);

router.get('/getUserinfo',islogin,isRoom,getUserinfo);

router.get('/viewVideo',viewVideo)

module.exports = router;