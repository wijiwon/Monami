

const { decode } = require('jsonwebtoken');
const {User, Post , Comment} = require('../models/index');
const path = require("path")

// [READ] 게시판에서 모든 게시글 보여주기 
    exports.allBoardView = async (req, res) => {
        // 보여주는 쿼리 쓰고 

        // res 하기 
    }

// [READ] 글쓰기 페이지 보여주기 
    exports.boardCreateView = async(req, res) => {
        console.log("🎏🎏🎏🎏🎏🎏🎏 여기까지 옴!!!!! ")
        res.redirect("http://127.0.0.1:5500/Monami/frontEnd/boardCreate.html")
}


// [CREATE] 게시판 글쓰기 
    exports.boardCreate = async (req, res) => {

        // 1) 저장할 데이터 솎아내기 
            const {file, body} = req;
            
            console.log("req 에서 file, body 분리 됐나 확인 👇 @boardController")
            console.log("req.body, req.file : " , req.body, req.file)

            // console.log("req.decode 값 확인 👇 @boardController")
            // console.log(req.decode)

    
        // 2) sequelize 상속받은 Post 객체로 쿼리 날리기 
        try {
            const newPost = await Post.create({
                user_id : 'dj', 
                    // req.decode 로 변환 가능 
                    // 임의로 넣음 ✅✅
                    // login 성공하면 👉 거기에서 가져오기 ✅✅ 
                    // 사용자의 ID 가 이쪽으로 들어갈 수 있게 해야 함. 
                
                status : 1,
                    // [기본값] 1로 설정
                    // [고민]
                        // 공개 = 1 = 게시판에서, 모두에게 다 보임,  
                        // 삭제 = 0 = 게시판에서, 삭제. | 마이페이지에는 있음. | 

                views : 1,
                    // 제목이 클릭되면 -> 숫자가 올라가게? 
                    // [기본값] 1로 설정 
                        // models > post.js 에서 'defaultValue: 1' 이렇게 설정할 수도 있어. ✅✅ 
                    // [추가할 일]
                        // item 덩어리가 클릭되면 > 여기가 숫자가 올라가게 하기 

                user_primaryKey : 2,    // 현재 dj 가 id 2번이라 임시로
                    // [TODO ✅]
                        // islogin 에서 가져오기? 
                        // user 가 만들어지는 순간 id 를 파악해서 가져오기 
                            // const id = newPost.id; 이것 처럼 

                    // [이슈]
                        // 이 지금 로그인 한 계정은 user 테이블에 들어가고, 그 user 테이블의 id 가 있겠지 
                        // decode.id 에 찍힌 아이디가, 바로 그 user 테이블에 있는 그 id 인건가? ❓❓❓
                        // 이게 살짝 불확실해 ⭐⭐⭐⭐⭐

                title : body.title, 
                content : body.content, 
                post_img : file.filename,       
                    // [해석] 이 주소를 img 태그의 src 에 넣으면 보여진다. 

            })
                
            // 3) 사용자가 봤으면 하는 화면으로 redirect 시키기
                
                // 방금만들어진 post 의 id 값 가져오기
                const id_post = newPost.id;
                console.log("id가 찍혀? 👇 @boardController > boardCreate")
                console.log(id_post)
                    // [해석]
                        // Post 의 create를 사용 -> newPost 인스턴스가 만들어짐 ⭐⭐⭐
                        // newPost 인스턴스에서 만들어진 테이블 속성에 접근이 가능 ⭐⭐⭐
            
                // id 값 포함해서 redirect 시키기
                    // [시도] - 라우터로 보내보기
                        res.json({ redirectURL: `http://127.0.0.1:4000/board/item/${id_post}` });
                            // [해석]
                                // ⭐⭐⭐ 포트를 4000 으로 해야 > 클라이언트에서 보내고, 라우터로 들어간다. 

                        // [예전버전] - 작동함🔵
                            // res.json({ redirectURL: `http://127.0.0.1:5500/Monami/frontEnd/boardItem.html` });
                                // [해석]
                                    // json 형식으로 변환해서 res 로 보냄 
                                    // 그 이유는 axios 를 통해 소통하면, 클라이언트가 redirect 를 자동으로 처리 못 하는 경우가 있다고 함 (by GPT)

            } catch (error) {
            console.log(error)
        }

    }


// [read] 게시글 상세 페이지 보여주기
    exports.boardItemView = async (req, res) => {
        
        console.log("===================================")
        const postId = req.query.id;

        try {
            // 1) 조회할 id 가 제대로 넘어오는가 
                // console.log("req.params.id 👉 " , req.params.id);
                // req.params.id 를 하는 이유 : routing url 에서 placeholder 에 담겨서 id 가 넘어왔기 때문에 
                // console.log("req.decode.id🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️" , req.decode.id)
                // console.log("req.decode.id🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️" , req.decode)


            // 2) User 테이블에서, data 가져오기
                const userWithPosts = await User.findOne({
                    where : {id : 2},   // ✅ 현재 dj 가 id 2 라서 설정함
                    include : [
                        {model : Post}
                    ]
                });

                console.log(" userWithPosts 데이터 확인 @boardItemView" , userWithPosts)
            
            // 2) Post 테이블에서, data 가져오기
                const postWithComments = await Post.findOne({
                    where : {id : postId}, 
                        // post 테이블 id 8번에 댓글이 여러개 있어 설정함
                        // 여기에 지금 작성중인 postId 값이 넘어와야 함 
                        // axios 를 통해 넘어올 수 밖에 없는데? 
                    include : [
                        {model : Comment}
                    ]
                });

                // 3) Comment 테이블에서, data
                    // const comment = await Comment.findOne( {
                    //     where : {id : 1}
                    //         // [해석] 
                    //             // 아... 여기도 지금 작성하는 댓글을 가져와야 함 
                    // } )
                    // console.log("comment 정보 @boardItemView" , comment)
                    //     // 👉 이건 아직 안 들어옴 
                    //     // 👉 이건, post 를 저장할 때, foreignKey 저장도 같이 해주는 걸 고려해야 함
                    
                // 4) Post 조회
                    // [궁금증] 
                        // post 는 따로 조회? 아니면, foreignKey로? 
                        // post 는 이걸로 하는건가❓❓❓

                    // userWithPosts의 데이터값에서 Posts를 가져와서 각 Post의 데이터값만 저장
                    // userWithPosts.dataValues.Posts = userWithPosts.dataValues.Posts.map(i => i.dataValues);
                        // console.log("" , e.dataValues.Posts[0].dataValues)
            
            // 5) 결과 합치기
                const result = {
                    user : userWithPosts, 
                    post : postWithComments,
                    // comment : comment,
                }
                console.log("게시글 상세에서 보여줄 데이터가 다 들어있나 @boardItemView" , result)
            
            // 6) 결과 보내기 
                res.json(result)

        } catch (error) {
            console.error(error);
        }
    }


// [read] params 로 id 넣었을 때, 보여지는거 
    exports.boardParamsView = async (req, res) => {
        try {
            // 1) 값 들어오는지 확인 
            console.log("@Controller > boardParamsView 입장 👇 ")
            // console.log("req.params.id 확인👉" , req.params.id)
        
            // 2) boardItem 보여주기 
                // [지금 버전] sendFile | 그냥 file 을 직접 보낸다.
                    res.sendFile(path.join(__dirname , "../../frontEnd/boardItem.html"))
                    // [효과] ⭐⭐⭐⭐⭐⭐ 
                        // 이렇게 하면 1) 해당 파일이 보여지고 
                        // 2) url 에 내가 원하는 정보를 묻힐 수 있다. 
                        // 3) 그리고, 이걸 그려줄 때, 빼서 쓸 수 있다. 
                //  [예전 버전] redirect 를 그냥 보낸다 
                // res.redirect(`http://127.0.0.1:5500/Monami/frontEnd/boardItem.html?postId=${req.params.id}`)
                    // 변경한 이유 : 여기에서 바로 보여줘야 한다. 

        } catch (error) {
            console.log(error)
            
        }
    }



// [create]
    exports.boardCommentCreate = async (req, res) => {
    
        try {
            // 1) 저장할 데이터 확인
                console.log("@ boardController > boardCommentCreate 진입!")
                console.log("👲👲👲👲👲 axios 로 날린거 보기" , req.body);
                console.log("댓글 쓴게 보이는지 확인 @boardCommentCreate" , req.body.data.content)
                
                // 댓글 내용
                const temp_write = req.body.data.content;
                
                // 댓글 작성한 유저 id
                const temp_user_primaryKey = req.body.data.user_primaryKey;
                
                // 댓글의 '대상이 되는 게시글 id'
                const temp_post_primaryKey  = req.body.data.post_primaryKey;

                // 대댓글의 경우 '대상이 되는 댓글 id'
                const temp_id_of_targetComment = req.body.data.id_of_targetComment;

                // 대댓글의 경우 '대상이 되는 댓글의 작성자' 
                const temp_writer_of_targetComment = req.body.data.writer_of_targetComment;


            // 2) sequelize 상속받은 Comment 객체로 쿼리 날리기 
                const newComment = await Comment.create({
                    // 댓글 작성 내용
                    content : temp_write,
                    
                    // 댓글 작성한 유저의 user 테이블 상의 id 
                    user_primaryKey : temp_user_primaryKey,

                    // 댓글 작성 대상이 된 '대상 게시글의 id' (post 테이블에서 가져오기)                    
                    post_primaryKey : temp_post_primaryKey,

                    // 댓글 작성 대상이 되는 '대상 댓글의 id' (comment 테이블에서 가져오기)
                    id_of_targetComment : temp_id_of_targetComment,

                    // 댓글 작성 대상이 되는 '대상 댓글을 쓴 유저' (comment 테이블에서 가져오기)
                    writer_of_targetComment : temp_writer_of_targetComment

                })


            // 3) res 보내기 

                // 방금 만들어진 댓글 id 값 가져오기 
                    const id_newComment = newComment.id
                
                // 댓글의 대상이 되는 게시글의 id 가져오기 
                    const id_post = temp_post_primaryKey
                    // const id_post = temp_post_primaryKey
                    // [해석] ⭐⭐⭐ | 나중에 잊어버릴거 같아 
                        // 1) '글쓰기 페이지(boardCreate.html)' 에서, 기입하고, 버튼 누르면, 게시글 id 가 url 에 담겨짐 
                        // 2) boardItem 에서는 getAPI() 에서 가져와서 👉 URL 경로에서 ID 값만 빼냄 
                        // 3) 그리고 ⭐'전역 변수 postId' 로 저장함 (SCOPE 주의)
                        // 4) 이 postId 를 댓글 클릭할 때 가져와서 이쪽에서 활용

                    // [requirement] 
                        // URL 형식은 '게시글id' + '댓글 id' 들 다 여야 함 
                        // '게시글 id 가 필요한 이유' = 댓글의 target 이 되기 때문
                    
                    console.log("res 까지 왔음!")
                    console.log("방금 작성한 댓글의 id" , id_newComment)

                    // 1) 이렇게 보내면 작동함
                        // res.redirect(`http://127.0.0.1:4000/board/item/${id_post}`)

                    // 2) 다만, 새로고침 되는게 싫어서 이렇게 보내보자 다시. 
                        res.json({
                            redirectURL :  `http://127.0.0.1:4000/board/item/${id_post}` , 
                            newComment : newComment,
                        })
                    
                    console.log("res 보내기 완료")
                    // res.send("댓글 작성 완료👏👏")
                
            } catch (error) {
                console.log(error)
                
            }

    }