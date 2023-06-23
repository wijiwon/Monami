
// 전역변수
    const routers = require("express").Router();
    const {   boardDeletePost,  boardEditPost, boardEditView, viewOrderView, likesView , allBoardView , boardCreate , boardCreateView , likesBtn,  boardItemView , boardCommentCreate , boardParamsView , commentDataGet , boardListPages , pagenation , pagenationView , defaultView, tagsPagenation} = require("../controllers/boardControllers")
    const { Upload } = require("../middleware/imageUpload")   
    const { islogin } = require("../middleware/isLogin");


// 전체 게시판 목록 보여주기
    // routers.get('/totalView' , allBoardView)
        // [참고 | GET 요청경로 및 페이지] http://127.0.0.1:8007/board/totalView | boardCreate.html
        // [추가할 것] 
            // ✅ isLogin 미들웨어 추가 해야 함


// [read] 게시판 글쓰는 곳 보여주기 
    routers.get("/create" ,  islogin, boardCreateView)


// [create] 게시판 글쓰기 
    routers.post('/create' , islogin, Upload.single("post_img") ,  boardCreate );
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
    routers.get('/item' , islogin, boardItemView)

// [read] post id 값을 가져온 걸로, 상세 페이지 보여주기 
    // routers.get('/item/*' , boardParamsView)
    // [해석] ejs 에서 /item/:id 쓰던 걸-> /item/* 이렇게 작성 ⭐⭐
    
    routers.get('/item/:id_post' , islogin , boardParamsView)
    // [해석] 이걸로 연결하게 되나❓ : 응. 글 작성하면, 이걸로 연결하게 돼


// [edit] 게시판 수정 | 값 읽어오기 | READ
    routers.get('/item/edit/:postID' , islogin, boardEditView)
    
// [edit] 게시판 수정 | 값 수정하기 | POST
    routers.post('/item/edit/:postId' , islogin, boardEditPost)


// [delete] 게시판 삭제 | 값 수정하기 | POST
    routers.post('/item/delete/:postId' , islogin, boardDeletePost)





    
// [create] 댓글 생성 
    // 1) 과거 버전 : 파일을 사용해서, multer 를 쓸 때 버전
        // routers.post('/comment/create' , Upload.single("comment_write"), boardCommentCreate)
    
    // 2) 현재 텍스트만 쓸 때 = 그래서, multer 를 사용하지 않을 때 버전
        routers.post('/comment/create', islogin, boardCommentCreate)
    // [주의할 부분]
        // 지금, single 메소드에 넣은 매개변수인 file 의 key 이름없음. 📛

// [get] comment 테이블에서, 대댓글의 target인 '원본 댓글만' 가져오기 
    routers.get('/comment' , islogin , commentDataGet)

// [create] 좋아요 버튼 숫자 넣기 
    routers.post('/likes' , islogin , likesBtn)


// [get] 게시판 목록 
    // 👇 게시판 목록에서 기본으로 보여주기 | 절대 변경금지 
    routers.get('/list' , islogin , boardListPages)

// [get] 게시판 > 페이지네이션 | 2page 클릭하면, 이쪽으로 오게
    routers.get('/list/page' , islogin , pagenation)    
        // query 방식에서는 ? 붙이지 않아도 됨. 
        
// [get] 게시판 > 페이지네이션 | 2page 클릭하면, 이쪽으로 오게
    routers.get('/list/page/tags' , islogin , tagsPagenation)    
        // query 방식에서는 ? 붙이지 않아도 됨. 


// [get] 게시판 > 우선, 페이지만 | createdAt 최근
    routers.get('/list/view' , islogin , defaultView)
    
// [get] 게시판 > 우선, 페이지만 | likes 좋아요 순
    routers.get('/list/likes' , islogin , likesView)
    
// [get] 게시판 > 우선, 페이지만 | views  순
    routers.get('/list/views' , islogin , viewOrderView)




// [get] 페이지 클릭하면 > 해당 페이지만 보여주기 
    // routers.get('/list/pagenation' , islogin , pagenationView)
    // 📛 router 간 역할 설명 필요 📛📛📛📛📛📛 

// [페이지 보여주는 법, 경로 처리] AWS 배포시 발생할 수 있는 문제 예방
    // 1) AWS 배포하게 되면, '모든 요청'은 '서버' 로 통일해줘야 
    // 2) 클라이언트가 '페이지를 요청' 하게 되면, 
        // a) '라우터에서 바로'
        // b) sendFile 로 보내주면 됨. 
    // routers.get('/list' , islogin , (req, res) => {
    //     res.sendFile(path.join( __dirname, "../../frontEnd/boardItem.html"))
    // })
    


module.exports = routers