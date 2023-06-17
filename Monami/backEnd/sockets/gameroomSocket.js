const server = require('../app');
const io = require('socket.io')(server);
const { Room } = require("../models")

const result = Room.findAll({})

// emit으로 보낼 데이터: room - 이름, 유저 수, 게임 상태
io.on('connection', (socket)=>{
    console.log('소켓 연결됨')
    io.emit('roomview',{result})
})
