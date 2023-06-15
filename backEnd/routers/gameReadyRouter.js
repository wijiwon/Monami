const router = require('express').Router();
const { RoomCreate, RoomChoice, RoomViews, UserView,getHost,RoomDelete} = require('../controllers/gameReadyController');
const { islogin } = require('../middleware/isLogin')

router.get('/',(req,res)=>{
  res.sendFile("/home/ubuntu/frontEnd/game.html");
});

router.get('/hi', islogin, RoomViews);

router.get('/userInfo', islogin, UserView);

router.post('/create', islogin, RoomCreate);

router.post('/roomchoice', islogin, RoomChoice);

router.post('/gethost',islogin,getHost)

router.post('/RoomDelete',islogin,RoomDelete)
module.exports = router;