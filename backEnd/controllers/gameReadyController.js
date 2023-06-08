const { User, Room } = require('../models');
const Sequelize = require('sequelize');

// 게임방을 생성하는 함수
exports.RoomCreate = async(req,res)=>{
    try {
        // console.log("req.body",req)
        const { title } = req.body;
        // const { decode } = req;
        console.log("타이틀?", title);
        // const { decoded } = req;
        Room.create({
            title: title,
            room_manager: 1
        })
        res.json({redirectURL: 'http://127.0.0.1:5500/frontEnd/gameReady.html'})
    } catch (error) {
        console.log(error)
    }
}

// 만들어진 게임방을 보여주는 함수
exports.RoomViews = async(req,res)=>{
    try {
        const data = await Room.findAll({});
        console.log("데이터",data)
        res.render(data);
    } catch (error) {
        
    }
}

// 게임방을 선택하는 함수
exports.RoomChoice = async(req,res)=>{

}

// 선택한 게임방에 속해있는 유저를 확인하는 함수
exports.RoomMember = async(req,res)=>{

}

// 게임방을 나가는 함수
exports.RoomExit = async(req,res)=>{

}