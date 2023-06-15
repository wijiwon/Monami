const router = require('express').Router();
const { islogin } = require('../middleware/isLogin')
const { DrawingAdd, viewVideo } = require('../controllers/gamePlay')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), DrawingAdd)

router.get('/viewVideo',viewVideo)

module.exports = router;