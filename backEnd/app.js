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
const mainloginaccessRouter=require("./routers/mainloginRouter");

app.use(express.urlencoded({extended:false}))

// 이미지 파일을 등록할 폴더 경로
app.use(express.static(path.join(__dirname,"imege")))

// app.use(cors({
//     origin: "http://127.0.0.1:5501",     // 각자 html 라이브서버 열어 url이 같은지 확인
//     credentials : true 
// }))
app.use(cors({
    origin:"http://127.0.0.1:5501",
}
));

app.use(session({
    name : "token",
    secret : process.env.REFRESH_TOKEN_KEY,
    resave : false,
    saveUninitialized : false
}))

app.use(express.json());

app.use('/main',mainInfoRouter);
app.use('/join',joinRouter);
app.use('/login',loginRouter);
app.use('/mainlogin',mainloginaccessRouter);

sequelize.sync({forse : false}).then(()=>{
    console.log("연결성공")
}).catch((err)=>{
    console.log(err)
})

// const server에 app 변수할당
const server=app.listen(4000, ()=>{
    console.log("서버열림")
})

const io=socketio(server);

io.on("connection",(socket)=>{
    console.log("유저 접속");

    socket.on("chat message", (msg) => {
        console.log("받은 메시지: " + msg);
    
        // 모든 클라이언트에게 메시지를 전송
        io.emit("chat message", msg);
      });
    
      // 클라이언트가 연결을 끊었을 때의 처리
      socket.on("disconnect", () => {
        console.log("클라이언트가 연결을 끊었습니다.");
      });


})