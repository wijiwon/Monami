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
const gameReady = require('./routers/gameReadyRouter');

app.use(express.urlencoded({extended:false}))

// 이미지 파일을 등록할 폴더 경로
app.use(express.static(path.join(__dirname,"imege")))

app.use(cors({
    origin: "http://127.0.0.1:5500",     // 각자 html 라이브서버 열어 url이 같은지 확인
    credentials : true 
}))

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
app.use('/gameready',gameReady);

sequelize.sync({forse : false}).then(()=>{
    console.log("연결성공")
}).catch((err)=>{
    console.log(err)
})

const server = app.listen(4000, ()=>{
    console.log("서버열림")
})

const io = socketio(server);

module.exports = server;