// 전역 변수 및 모듈 임포트 
    const express = require("express");
    const path = require("path");
    const socketio = require("socket.io");
    const session = require("express-session");
    const cors = require("cors")

    const app = express();
    const { sequelize } = require("./models")


// 테이블 생성 
    sequelize.sync({forse : false}).then(()=>{
        console.log("연결성공")
    }).catch((err)=>{
        console.log(err)
    })
        // force : 초기화 시킬지 여부 , 데이터 베이스에 값이 있으면 지울지 여부



// 미들웨어 
    app.use(express.urlencoded({extended:false}))

    // 이미지 파일을 등록할 폴더 경로
    app.use(express.static(path.join(__dirname,"image")))

    app.use(cors({
        origin: "http://127.0.0.1:5500",     // 각자 html 라이브서버 열어 url이 같은지 확인
        credentials : true 
    }))

    app.use(session({
        secret : process.env.REFRESH_TOKEN_KEY,
        resave : false,
        saveUninitialized : false
    }))

    // 라우터로 연결
    app.use('/board' , boardRouter);
    




// 서버 대기 상태 
    app.listen(8007, ()=>{
        console.log("서버열림")
    })