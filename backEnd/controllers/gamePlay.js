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
exports.DrawingAdd = async (req, res) => {
    try {
        const { room, decode } = req;
        // console.log("지금 방 정보를 확인할 수 있다고???",room)

        const videoData = req.file.buffer;
        const drawing = await Drawing.create({
            content: videoData,
            user_primaryKey: decode.id,
            room_primaryKey: room.id
        });
        const lastDrawing = drawing.id;
        console.log("내가 서버에서 보내준 그림의 id 값은?????????", lastDrawing)
        // res.sendStatus(200);
        res.status(200).json({ drawing, lastDrawing });

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

//그림을 보여주는 함수
exports.viewVideo = async (req, res) => {
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

// 그림 저장 시, 저장한 그림의 id 값을 question테이블에 저장하는 함수
exports.DrawQueUpdate = async (req, res) => {
    try {
        const { decode, room } = req;
        const { painter, lastDrawing, viewIndex } = req.body;

        console.log("그림그린사람 여기여기 붙어라", painter)
        console.log("내가 루브르에 갈 상인가", lastDrawing)
        console.log("제시어 정보 정말 불러와지는거야,,,?", viewIndex)

        // 해당룸, 해당유저의 row를 찾아 제시어에 추가함
        const Insert = [];
        Insert.push(painter);
        Insert.push(lastDrawing);
        console.log("그림 정보 제대로 담겼을까??????", Insert);
        const queNum = viewIndex[0];
        const queContent =[];
        queContent.push(viewIndex[1]);
        queContent.push(Insert.toString());
        console.log("제시어 아이디도 잘 나올까?????", queNum);
        console.log("제시어 내용도 잘 나올까?????", queContent);

        await Question.update({content: queContent.toString()}, {where: {id: queNum}})



    } catch (error) {
        console.log(error)
    }
}


// 첫 번째 제시어를 입력하는 함수
exports.firstQuestionInput = async (req, ree) => {
    try {
        const { value } = req.body;
        const { decode } = req;
        const { room } = req;
        // console.log("값이 잘 받아와 질까요???????", value)
        // console.log("값이 잘 받아와 질까요???????", decode.id)
        // console.log("값이 잘 받아와 질까요???????", room.id)
        const question2 = await Question.findOne({ where: { user_primaryKey: decode.id, room_primaryKey: room.id } })
        if (question2 == null) {
            // 해당 방, 해당 유저가 입력한 제시어가 없으면 question db에 생성한다.
            // console.log("어서와 제시어는 처음이지?????")
            await Question.create({
                content: value,
                user_primaryKey: decode.id,
                room_primaryKey: room.id
            })
        }
        // else {
        //     // 해당 방, 해당 유저가 입력한 제시어가 있으면 이미 있는 db에 추가한다.
        //     console.log("또 왔어??????")
        //     console.log("또 왔어??????", question2.dataValues.content)
        //     const question3 = question2.dataValues.content;
        //     const question4 = [];
        //     question4.push(question3);
        //     question4.push(value);
        //     // await Question.update()


        // }
    } catch (error) {
        console.log(error);
    }
}

//제시어를 보여주는 함수
exports.QuestionView = async (req, res) => {
    try {
        const { room, decode } = req;
        const isroomQue = await Question.findAll({ where: { room_primaryKey: room.id } })
        console.log("제시어를 보여줄 수 있겠니??????", isroomQue)
        // 반환해야하는 것
        // content - html에서 그림그릴 때 사용
        // id - 그림 저장할 때 question id찾아서 그림의 id값을 넣어줘야 함
        // user_p - 누가 쓴 제시어인지 필요한가,,,? 제시어 나눠줄때 필요한가????? 우선 보내
        const roomManager = room.room_manager;
        const usersInRoom = room.users_in_room.split(",").map(Number);

        const questionData = isroomQue
            .map((i) => {
                const id = i.dataValues.id;
                const content = i.dataValues.content;
                const user_primaryKey = i.dataValues.user_primaryKey;
                return [id, content, user_primaryKey];
            })
            .sort((a, b) => {
                const aIndex = usersInRoom.indexOf(a[2]);
                const bIndex = usersInRoom.indexOf(b[2]);

                if (a[2] === roomManager) return -1; // room_manager를 가장 앞에 위치
                if (b[2] === roomManager) return 1; // room_manager를 가장 앞에 위치

                return aIndex - bIndex; // users_in_room 순서대로 정렬
            });

        console.log("묶인 데이터:", questionData);

        const resultData = { questionData: questionData, userID : decode.id};

        res.send(resultData);


    } catch (error) {
        console.log(error)
    }

}
exports.getUserinfo= async(req,res)=>{
    try {
        const { room } = req;
        console.log(room);
        console.log("지금 방 정보를 확인할 수 있다고???",room)
        res.send({_room:room});

    } catch (error) {
        console.log(error);
    }

    
}
