const { User, Room } = require('../models');
const Sequelize = require('sequelize');
const { get } = require('../routers/gameReadyRouter');
const Op = Sequelize.Op;

// 게임방을 생성하는 함수
exports.RoomCreate = async (req, res) => {
    try {
        const { title } = req.body;
        const { decode } = req;
        Room.create({
            title: title,
            room_manager: decode.id
        })
        // res.json({redirectURL: 'http://127.0.0.1:5500/frontEnd/gameReady.html'})
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
}

// 만들어진 게임방을 보여주는 함수
exports.RoomViews = async (req, res) => {
    try {
        const data = await Room.findAll({where: { play: {[Op.ne] : 2} }});
        for (const el of data) {
            //-------- 방장의 이름을 보여주는 구문 ------------------------------------------------
            const userId = el.dataValues.room_manager;
            const userleader = await User.findOne({ attributes: ['username'], where: { id: userId } })
            const userName = userleader.dataValues.username;
            el.dataValues.room_manager = userName;

            //-------- 게임 대기 팝업에서 멤버의 이름을 보여주는 구문 (여기가 아닌, 방을 선택하는 팝업에서 보여야 한다.)-------------------------------
            const usermem = el.dataValues.users_in_room;        // db의 멤버 값을 받는다.
            if (usermem == null) {          // 들어온 멤버가 없으면
                console.log("들어온 유저가 없대여");
            }
            else {      // 들어온 멤버가 있으면
                const usermem2 = usermem.indexOf(",")

                if (usermem2 == -1 && usermem2 != null) {   // 들어온 유저가 1명이면
                    // console.log("들어온 유저가 한명이야")
                    const RoomMem = await User.findOne({ attributes: ['username'], where: { id: usermem } })
                    // console.log("유저명은???????????", RoomMem)
                    const RoomMem2 = RoomMem.dataValues.username;
                    el.dataValues.users_in_room = RoomMem2;
                    // console.log("데이터 변경 각????????????", el.dataValues)

                }
                else if (usermem2 != -1 && usermem2 != null) {  // 들어온 유저가 여러명이면

                    let roommem = usermem.split(',');   // 현재 방의 유저의 아이디 값을 배열로 담는다.
                    // console.log("현재 방의 아이디 값은?????????", roommem)

                    let roommem3 = [];      // 멤버의 네임 값을 받을 배열
                    for (const elm of roommem) {
                        const roommem2 = elm;
                        let finalMem = "";  // 멤버의 이름값을 받을 strig객체. el에 들어갈 값
                        // console.log("현재 방의 유저는 아이디는???????????", roommem2)
                        const RoomMem = await User.findOne({ attributes: ['username'], where: { id: roommem2 } })
                        const userName2 = RoomMem.dataValues.username;
                        // console.log("해당 유저의 네임은???????????", userName2)
                        // console.log("mmmmmmmmmmmmmmmmmmm",elm)
                        // elm.dataValues.users_in_room += userName2;
                        roommem3.push(userName2);
                        // console.log("유저의 아이디 값이 들어올까요???", roommem3)
                        finalMem = roommem3.toString();
                        el.dataValues.users_in_room = finalMem;
                    }
                }
            }
        }
        res.json(data);

    } catch (error) {
        console.log(error)
    }
}

// 게임방을 선택하는 함수
exports.RoomChoice = async (req, res) => {
    // 선택된 방의 id 값을 클라이언트에서 받아온다.
    // 선택된 방의 방장의 아이디 값이 로그인한 유저의 아이디 값과 같은지 확인한다.
    // 같다면 선택을 할 수 없다. (err)
    // 같지 않다면 해당 room의 정보를 클라이언트 측에 보내준다.
    try {
        const { id } = req.body;
        const { decode } = req;

        const room = await Room.findOne({where : {id : id}});
        
        const currentMem = room.users_in_room; // 현재 users_in_room 값 가져오기
        const newMem = [];
        if(currentMem != null){
            console.log("$$$$$$$$$$$$$$$$$$$$",room.dataValues.users_in_room)
            // const roomuser = room.dataValues.users_in_room;
            console.log("sdsdsds",currentMem.indexOf(decode.id));
            const isuser = currentMem.indexOf(decode.id);
            if(isuser == -1){
                newMem.push(currentMem);
                newMem.push(decode.id);    // 새로운 title 값 생성
                const newMem2 = newMem.toString();
                await Room.update({users_in_room : newMem2}, {where : {id : id}});
            }
        }
        else{
            newMem.push(decode.id);    // 새로운 title 값 생성
            const newMem2 = newMem.toString();
            await Room.update({users_in_room : newMem2}, {where : {id : id}});
        }
            
    } catch (error) {        
        console.log(error)
    }
}

// // 선택한 게임방에 속해있는 유저를 확인하는 함수
// exports.RoomMember = async (req, res) => {

// }

// 게임방을 나가는 함수
exports.RoomExit = async (req, res) => {
    // 게임방을 나가면 user_in_room에서 삭제된다.


}
exports.RoomDelete = async (req, res) => {
    // 게임방을 나가면 user_in_room에서 삭제된다.
    
    const {title} = req.body;
    console.log(title);
    await Room.destroy({ where: { title: title } });
    res.json();
}


exports.UserView = async (req, res) => {
    const { decode } = req;
    res.json(decode);
}

exports.getHost = async(req,res)=>{
    try {
        console.log("하아하이이하이히아");
        const {title} = req.body;
        console.log(title);
        const room = await Room.findOne({where:{title:title}});
        // const room = await Room.findOne({
        //     order: [['id', 'DESC']],
        //   })
          console.log(room);
        res.json(room);
    } catch (error) {
        console.log(error);
    }
}

exports.gamestatupdatae=async(req,res)=>{
    try {
        const {id}=req.body;
        console.log("gamestatupdatae",id);
        await Room.update({play:1},{where:{id:id}});
        res.json();
    } catch (error) {
        console.log(error);
    }
}