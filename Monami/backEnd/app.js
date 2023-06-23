// 전역 변수 및 모듈 임포트 
    const express = require("express");
    const path = require("path");
    const socketio = require("socket.io");
    const session = require("express-session");
    const cors = require("cors")

    // 라우팅 처리 어떻게 되는지 보기 위한 모듈 
    // const morgan = require('morgan');


const app = express();
const { sequelize } = require("./models")
const mainInfoRouter = require("./routers/mainRouter");
const joinRouter = require("./routers/joinRouter");
const loginRouter = require("./routers/loginRouter");
const mainloginaccessRouter=require("./routers/mainloginRouter");

const boardRouter = require("./routers/boardRouter");

// 오류나서 임시 코드 by gtp
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());


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
    
    // 이미지를 static 으로 만들어줌 
    app.use(express.static(path.join(__dirname,"image")));
        // [해석]
            // static 으로 만들면, 로그인이 잘 안 될 때 나오는 것 처럼, 폴더 자체에 저장하고, 거기에서 꺼내올 수 있음. 

    // axios 에서 data type 을 텍스트 데이터, json 형식으로 전달하려면, 필요한, 미들웨어 ⭐⭐⭐⭐⭐ 
    app.use(express.json())

    // cors 생성 : 해당 경로에서 온 클라이언트만 유효함
    app.use(cors({
        origin: "http://127.0.0.1:5500",     // 각자 html 라이브서버 열어 url이 같은지 확인
        credentials : true 
    }))
    
    // 라우팅 처리 어떻게 되는지 보기 위한 미들웨어
    // app.use(morgan('dev'));


app.use(session({
    name : "token",
    secret : process.env.REFRESH_TOKEN_KEY,
    resave : false,
    saveUninitialized : false
}))

app.use(express.json());


// 라우터로 연결
app.use('/main',mainInfoRouter);
app.use('/join',joinRouter);
app.use('/login',loginRouter);
app.use('/mainlogin',mainloginaccessRouter);


app.use("/board" , boardRouter);




// db 
sequelize.sync({forse : false}).then(()=>{
    console.log("연결성공")
}).catch((err)=>{
    console.log(err)
})



// // db 연결 되었나 확인
//   sequelize
//     .authenticate()
//     .then(() => {
//       console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//       console.error('Unable to connect to the database:', err);
//     });


app.listen(4000, ()=>{
    console.log("서버열림")
})
