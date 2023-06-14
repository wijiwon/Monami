const router = require('express').Router();
const { RoomCreate, RoomChoice, RoomViews, UserView,getHost } = require('../controllers/gameReadyController');
const { islogin } = require('../middleware/isLogin')

router.get('/', islogin, RoomViews);

router.get('/userInfo', islogin, UserView);

router.post('/create', islogin, RoomCreate);

router.post('/roomchoice', islogin, RoomChoice);

router.get('/gethost',islogin,getHost)
module.exports = router;