// 전역 변수 및 모듈 임포트 
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


    const boardRouter = require("./routers/boardRouter");


// 테이블 생성 
    sequelize.sync({forse : false}).then(()=>{
        console.log("연결성공")
    }).catch((err)=>{
        console.log(err)
    })
        // force : 초기화 시킬지 여부 , 데이터 베이스에 값이 있으면 지울지 여부


// 미들웨어 
    // body 객체 생성
    app.use(express.urlencoded({extended:false}))

    // axios 에서 data type 을 텍스트 데이터, json 형식으로 전달하려면, 필요한, 미들웨어 ⭐⭐⭐⭐⭐ 
    app.use(express.json())

    // cors 생성 : 해당 경로에서 온 클라이언트만 유효함
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
app.use('/mainlogin',mainloginaccessRouter);

sequelize.sync({forse : false}).then(()=>{
    console.log("연결성공")
}).catch((err)=>{
    console.log(err)
})

app.listen(4000, ()=>{
    console.log("서버열림")
})