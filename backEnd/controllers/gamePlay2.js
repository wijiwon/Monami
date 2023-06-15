const { User, Room, Question, Drawing } = require('../models');


// const users = async()=>{
//     const playRoom = await Room.findOne({where: {play : 1}})
//     const playUser = 
// }


// 해당 게임방의 정보를 받는다.
    // socket으로 넘어갔을 테니 게임 방의 정보는 게임 방의 id값만 불러와지면 된다.
// 제시어를 받는다.
    // 1. room id 값을 걸러내 배열로 만든다.
    // 2. 제시어를 받는다.
// 그림을 그린다.
    // 1. 그림의 url을 content에 담는다.
    // 2. 그림의 room id, user, question id를 담는다.
// 그림을 확인하고 제시어를 받는다.


// 그린 그림을 db에 저장한다.
exports.DrawingAdd = async(req,res)=>{
    try {
        // 게임 중인 방의 정보를 불러온다. socket으로 구현 되었을 때 수정해서 작업한다.
        const playRoom = await Room.findOne({where: {id : 1}})
        const { url } = req.body;
        console.log("?????????????????",url)
        await Drawing.create({
            content : url
        })
        
    } catch (error) {
        console.log(error)
    }
        // console.log("플레이 중인 방은?",playRoom)
    // console.log("플레이 중인 방의 멤버는?",playRoom.users_in_room);
    // const playUser = playRoom.users_in_room.split(',');
    // playUser.unshift(playRoom.room_manager); 
    // console.log("방의 총 멤버는?",playUser)

    // const { decode } = req;
    // console.log("로그인한 유저의 아이디는??",decode.id)
}

// 그림을 보여주는 함수
exports.viewVideo = async(req,res)=>{
    const draw = await Drawing.findOne({where: {id : 9}});
    // console.log("#####################",draw.content)
    const data = draw.content
    res.send(data)
}