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
        const { room } = req;
        console.log("지금 방 정보를 확인할 수 있다고???",room)
        const videoData = req.file.buffer;
        await Drawing.create({
            content: videoData
        });
        // res.sendStatus(200);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

//그림을 보여주는 함수
exports.viewVideo = async(req,res)=>{
    try {
        const draw = await Drawing.findOne({ where: { id: 41 } });
        // console.log("왜 재생안되는데????????????",draw.content);
        const videoData = draw.content;
        res.status(200).set({
            'Content-Type': 'video/webm',
            'Content-Length': videoData.length
          }).send(videoData);
        // res.writeHead(200, {
        //     'Content-Type': 'video/webm',
        //     'Content-Length': videoData.length
        // });
        // res.end(videoData);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
  