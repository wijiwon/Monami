const router = require('express').Router();
const { RoomCreate, RoomChoice, RoomViews, UserView,getHost,RoomDelete,gamestatupdatae} = require('../controllers/gameReadyController');
const { islogin } = require('../middleware/isLogin')

router.get('/',islogin,(req,res)=>{
  res.sendFile("/home/ubuntu/frontEnd/gameReady.html");
});

router.get('/hi', islogin, RoomViews);

router.get('/userInfo', islogin, UserView);

router.post('/create', islogin, RoomCreate);

router.post('/roomchoice', islogin, RoomChoice);

router.post('/gethost',islogin,getHost)

router.post('/RoomDelete',islogin,RoomDelete)

router.post('/gamestatupdatae',islogin,gamestatupdatae)
module.exports = router;