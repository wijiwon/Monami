const router = require('express').Router();
const { RoomCreate, RoomChoice, RoomViews } = require('../controllers/gameReadyController');
const { islogin } = require('../middleware/isLogin')

router.get('/', RoomViews);

router.post('/create', islogin, RoomCreate);

module.exports = router;