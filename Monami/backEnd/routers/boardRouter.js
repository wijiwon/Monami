
// 전역변수
    const routers = require("express").Router();
    const { allBoardView , boardCreate , boardCreateView , boardItemView , boardCommentCreate , boardParamsView } = require("../controllers/boardControllers")
    const { Upload } = require("../middleware/imageUpload")   
    const { islogin } = require("../middleware/isLogin");


// 전체 게시판 목록 보여주기
    // routers.get('/totalView' , allBoardView)
        // [참고 | GET 요청경로 및 페이지] http://127.0.0.1:8007/board/totalView | boardCreate.html
        // [추가할 것] 
            // ✅ isLogin 미들웨어 추가 해야 함


// [read] 게시판 글쓰는 곳 보여주기 
    routers.get("/create" ,  boardCreateView)
    

// [create] 게시판 글쓰기 
    routers.post('/create' ,  Upload.single("post_img") ,  boardCreate );
        // [해석]
            // [POST 요청 경로 및 페이지] http://127.0.0.1:8007/board/create | boardCreate.html

            // [해석]
                // 1) 미들웨어 처리가 끝나면, 파일은 image 폴더에 들어가서 GET 요청을 기다리게 된다. 
            // [중요포인트] ⭐⭐⭐ 
                // Upload.single("post_img") 여기에서 "post_img" 는
                // boardCreate.html 에서     form.append("post_img" , post_img.files[0]); 이걸 기재할 때, 
                    // key인 post_img 와 동일하게 적어야 한다. 
                    // 즉, file 를 전송할 때의 key 값과 동일하게 적어야 한다. 
                    // 이것이 가능한 이유는 클라이언트에서 보낸 multipart/form-data 에 필드명이 담겨있고, 그래서 가능해 
                    // 이걸 가지고, 미들웨어는, file 에 해당하는 값을 찾아서 file 객체로 만들겠지.


// [read] 게시판 상세 내용 보여주기 
    routers.get('/item' , boardItemView)

// [read] id 값을 가져온 걸로, 상세 페이지 보여주기 
    // routers.get('/item/*' , boardParamsView)
    // [해석] ejs 에서 /item/:id 쓰던 걸-> /item/* 이렇게 작성 ⭐⭐
    
    routers.get('/item/:id' , boardParamsView)
    // [해석] 이걸로 연결하게 되나❓❓❓❓❓ 


    
// [create] 댓글 생성 
    // 1) 과거 버전 : 파일을 사용해서, multer 를 쓸 때 버전
        // routers.post('/comment/create' , Upload.single("comment_write"), boardCommentCreate)
    
    // 2) 현재 텍스트만 쓸 때 = 그래서, multer 를 사용하지 않을 때 버전
        routers.post('/comment/create', boardCommentCreate)
    // [주의할 부분]
        // 지금, single 메소드에 넣은 매개변수인 file 의 key 이름없음. 📛

module.exports = routers