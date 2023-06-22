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
        const drawing2 = await Drawing.findOne({where : {id : lastDrawing}});
        // console.log("내가 서버에서 보내준 그림의 id 값은?????????", lastDrawing)
        // res.sendStatus(200);
        console.log({data : { drawing, lastDrawing }}, "22222222222222222222222222222")
        console.log(drawing2, "22222222222222222222222222222")
        res.status(200).json({ drawing, lastDrawing });

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

//그림을 보여주는 함수
exports.viewVideo = async (req, res) => {
    try {
        const { Drawid } = req.body;
        console.log("나는 그림아이디가 필요해..... 보내줘어어억",Drawid)
        const draw = await Drawing.findOne({ where: { id: Drawid } });
        console.log("왜 재생안되는데????????????",draw);
        const videoData = draw.content;
        console.log(videoData.toString("base64"), "222222222222222222221321321312312");
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
        console.log("viewVideodddd")
        console.log(error);
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
        res.send();


    } catch (error) {
        console.log(error)
    }
}


// 첫 번째 제시어를 입력하는 함수
exports.firstQuestionInput = async (req, res) => {
    try {
        const { value } = req.body;
        const { decode } = req;
        const { room } = req;
        console.log("값이 잘 받아와 질까요???????", value)
        console.log("값이 잘 받아와 질까요???????", decode.id)
        console.log("값이 잘 받아와 질까요???????", room.id)
        const question2 = await Question.findOne({ where: { user_primaryKey: decode.id, room_primaryKey: room.id } })
        console.log("왜 이래 우리 사이 좋았잖아,,,,,,,",question2)
        if (question2 == null) {
            // 해당 방, 해당 유저가 입력한 제시어가 없으면 question db에 생성한다.
            console.log("어서와 제시어는 처음이지?????")
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
        res.send()
    } catch (error) {
        console.log(error);
    }
}


// 두 번째 제시어를 입력하는 함수
exports.TwoQuestionInput = async (req,res)=>{
    try {
        const { room } = req;
        const {id, value, queValue} = req.body;
        console.log("정답 입력자 아이디는????????", id);
        console.log("정답은????????", value);
        console.log("제시어의 아이디는????????", queValue);
    
        // 현재 제시어의 데이터값
        const isQue = await Question.findOne({where: {room_primaryKey: room.id, id: queValue}})
        console.log("현재 제시어는??????????",isQue.dataValues.content);
        // 제시어의 content 값
        const isCon = isQue.dataValues.content;
        // content값 배열화
        const isArr = isCon.split(',');
        console.log("배열이 잘 완성되었을까요????? ㄷㄱㄷㄱㄷㄱ",isArr)
        
        const Insert = [];
        Insert.push(isCon);
        Insert.push(id);
        Insert.push(value);
        console.log("정답 입력자 아이디랑 정답 내용이 잘 들어갈까요????? ㄷㄱㄷㄱㄷㄱ",Insert)
        const content = Insert.toString();
        console.log("문자열????? ㄷㄱㄷㄱㄷㄱ",content)
    
        await Question.update({content : content}, {where: {id:queValue}})
        res.send();
    } catch (error) {
        
    }

}




//제시어를 보여주는 함수
exports.QuestionView = async (req, res) => {
    try {
        const { room, decode } = req;
        const isroomQue = await Question.findAll({ where: { room_primaryKey: room.id } })
        // console.log("제시어를 보여줄 수 있겠니??????", isroomQue)
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
        console.log("req임")
        console.log(req)
        const { id } = req.body;
        const {room}=req;
        console.log(id);
        let adf=[];
        for(let i =0;i<id.length;i++){
            let Que = await User.findOne({ where: { id: id[i] } })
            adf.push(Que);
        }
        adf.push(room);
        console.log(adf);

        res.json(adf);
    } catch (error) {
        console.log(error);
    }

    
}
