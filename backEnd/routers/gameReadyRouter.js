const router = require('express').Router();
const { RoomCreate, RoomChoice } = require('../controllers/gameReadyController');
const { islogin } = require('../middleware/isLogin')

router.get('/', RoomChoice);

router.post('/create', islogin, RoomCreate);

module.exports = router;