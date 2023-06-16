const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const session = require("express-session");
const cors = require("cors")
const app = express();
const { sequelize } = require("./models")
const mainInfoRouter = require("./routers/mainRouter");
const joinRouter = require("./routers/joinRouter");
const loginRouter = require("./routers/loginRouter");
const mainloginaccessRouter = require("./routers/mainloginRouter");
const gameReady = require('./routers/gameReadyRouter');
const game = require('./routers/gameReadyRouter');
const logoutUser = require("./routers/logoutRouter");
const mypageRouter = require("./routers/mypageRouter");
const adminRouter = require("./routers/adminRouter");
const gameRouter = require("./routers/game");

app.use(express.urlencoded({ extended: false }))

// 이미지 파일을 등록할 폴더 경로

app.use("/img", express.static(path.join(__dirname, "image")));

app.use(cors({
    origin:"http://127.0.0.1:5500",
    credentials: true
}));


// app.use(cors({
//     origin:"http://127.0.0.1:5501",
// }
// ));

app.use(session({
    name: "token",
    secret: process.env.REFRESH_TOKEN_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(express.json());


app.use('/gameready', gameReady);

app.use('/main',mainInfoRouter);
app.use('/join',joinRouter);
app.use('/login',loginRouter);
app.use('/mainlogin',mainloginaccessRouter);
app.use('/logout',logoutUser);
app.use("/mypage",mypageRouter);
app.use("/admin",adminRouter);
app.use("/game",gameRouter);

sequelize.sync({ forse: false }).then(() => {
    console.log("연결성공")
}).catch((err) => {
    console.log(err)
})

// const server에 app 변수할당
const server = app.listen(4000, () => {
    console.log("서버열림")
})

const io = socketio(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});



let userid = [];
let usercount = 0;
let username = [];
let rooms = new Array(100);


io.on('connection', (socket) => {

    console.log(socket.id, ' user connected');
    userid.push({
        userid: socket.id,
        primarykey: usercount,
        _nickname: ""
    });
    usercount++;
    console.log("유저아이디임", userid);
    socket.on('chat message', (msg) => {
        let obj = {}
        console.log('Received message:', msg);
        // Broadcast the message to all connected clients
        for (let i = 0; i < userid.length; i++) {
            if (userid[i].userid === msg.id) {
                obj.nick = userid[i]._nickname;
                obj.message = msg.message;
            }
        }
        io.emit('chat message', obj);
    });

    io.emit('nowusers', userid);
    socket.on('disconnect', () => {
        userid = userid.filter(user => user.userid !== socket.id);
        console.log(socket.id, ' user disconnected');
        console.log(userid);
        io.emit('nowusers', userid);
        io.emit('disconnectuser', socket.id);
    });
    // 귓속말 보내는 socket
    socket.on('whisper', ({ message, receiverId }) => {
        // let receiver=false;
        // for(let i=0;i<userid.length;i++){
        //   if(userid[i]==receiverId)
        //   {
        //     console.log(receiverId);
        //     receiver=true
        //   }
        // }
        // if(receiver){
        //   io.emit('whisper',{message,senderid:socket.id});
        // }
        io.to(receiverId).emit('whisper', message);
    })
    // 유저 아이디받아옴
    socket.on('connectuser2', (e) => {
        console.log("connectuser2", e.data.name);
        userid[userid.length - 1]._nickname = e.data.name;
        console.log("connectuser2 userid", userid[userid.length - 1]);
        console.log(userid);
        io.emit('nowusers', userid);
        io.emit('connectuser', userid[userid.length - 1]);
    });
    socket.on('madeRoom', () => {
        io.emit('madeRoom', () => {
            console.log("방만드는 이벤트 받아서 다시 쏴줌");
        })
    })

    let _roomNum = 0;
    let roomName = ``;
    let clientsInRoom = [];
    socket.on('exitRoom', () => {
        console.log("User has exited the room");
        socket.leave(roomName);
        console.log("나가기", clientsInRoom);
        for (let i = 0; i < userid.length; i++) {
            for (let n = 0; n < userid.length; n++) {
                if (userid[i].userid == clientsInRoom[n]) {
                    username[i] = userid[i]._nickname;
                }
            }
        }
        socket.to(roomName).emit('getreadyuser', username);
        // Perform any additional actions or emit events as needed
    });
 
    socket.on('createRoom', (num) => {
        console.log("num",num);
        console.log("adsfads", rooms);
        console.log(rooms[0]);

        const newRoom = {
            room_Num: num.id,
            user: [],
            usernickname:[],
            host: num.room_manager,

            roomSocketname: ""
        };

        rooms[num.id] = newRoom;
        console.log("", rooms);
    });

    socket.on('joinRoom', (roomNum) => {
        console.log("방입장 한뒤 소켓으로보냄");
        _roomNum = roomNum;
        roomName = `room${_roomNum}`;
        socket.join(roomName);
        // socket.on('exitRoom', () => {
        //     console.log("User has exited the room");
        //     socket.leave(roomName);
        //     socket.to(roomName).emit('getreadyuser',  username );
        //     // Perform any additional actions or emit events as needed
        // });
        let obj = {}
        obj.nick = "운영자"
        obj.message = `${roomName}새로운 유저가 방에 입장하였습니다.`;
        console.log(`${roomName}에접속`)
        clientsInRoom = Array.from(io.sockets.adapter.rooms.get(roomName));
        console.log("clientsInRoom", clientsInRoom);
        // console.log(userid);
        // for (let i = 0; i < userid.length; i++) {
        //     for (let n = 0; n < userid.length; n++) {
        //         if (userid[i].userid == clientsInRoom[n]) {
        //             username[i] = userid[i]._nickname;
        //         }
        //     }
        // }
        for (let i = 0; i < clientsInRoom.length; i++) {
            if(socket.id ==clientsInRoom[i])
            {
                rooms[roomNum].user.push(socket.id);
            }
        }
        for (let i = 0; i < clientsInRoom.length; i++) {
            for (let n = 0; n < userid.length; n++) {
            if(userid[i].userid==rooms[roomNum].user[n])
            {
                rooms[roomNum].usernickname.push(userid[i]._nickname);
            }
        }
        }
        console.log(rooms[roomNum]);
        socket.to(roomName).emit('chat message', obj);
        socket.to(roomName).emit('getreadyuser', rooms[roomNum].usernickname);
        socket.on('gamestart', () => {
            io.to(clientsInRoom[0]).emit('hostgamestart', () => {
                console.log("방장도 같이시작.");
            })
            setTimeout(() => {
                socket.to(roomName).emit('gamestart1', () => {
                    console.log("여기까지옴");
                })

            }, 1000);
            setTimeout(() => {
                socket.to(roomName).emit('gamestart2', () => {
                    console.log("여기까지옴");
                })

            }, 2000);
            setTimeout(() => {
                socket.to(roomName).emit('gamestart3', () => {
                    console.log("여기까지옴");
                })
            }, 3000);
            setTimeout(() => {
                io.emit('THrowGameMember', rooms);
                console.log("정보를 게임방으로 던져줌");
            }, 6000);
        })
    })
});