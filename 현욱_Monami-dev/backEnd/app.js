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

app.use(express.urlencoded({ extended: false }))

// 이미지 파일을 등록할 폴더 경로
app.use(express.static(path.join(__dirname, "image")))

app.use(cors({
    origin:"http://127.0.0.1:5501",
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

app.use('/main', mainInfoRouter);
app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/mainlogin', mainloginaccessRouter);
app.use('/gameready', gameReady);

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
        let obj={}
        console.log('Received message:', msg);
        // Broadcast the message to all connected clients
        for(let i =0;i<userid.length;i++){
            if(userid[i].userid===msg.id){
                obj.nick=userid[i]._nickname;
                obj.message=msg.message;
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
       console.log("connectuser2",e.data.name);
      userid[userid.length-1]._nickname=e.data.name;
       console.log("connectuser2 userid",userid[userid.length-1]);
       console.log(userid);
       io.emit('nowusers', userid);
       io.emit('connectuser', userid[userid.length-1]);
    });
    socket.on('makedRoom',()=>{
        io.emit('makedRoom',()=>{
            console.log("방만드는 이벤트 받아서 다시 쏴줌");
        })    
    })
});