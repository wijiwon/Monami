
const router = require("express").Router();

const {allBoardView} = require("../controllers/boardControllers")


// http://127.0.0.1:8007/board/totalView
router.get('/totalView' , allBoardView)

    // [추가할 것] 
        // ✅ isLogin 미들웨어 추가 해야 함



exports.module = router