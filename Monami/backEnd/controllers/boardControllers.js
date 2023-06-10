

const { decode } = require('jsonwebtoken');
const {User, Post , Comment} = require('../models/index');


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
        
            
            console.log("req 에서 file, body 분리? @boardController")
            console.log("req.body, req.file 👉👉" , req.body, req.file)
            // console.log("req.decode 값 있나? @boardController" , req.decode)

            // console.log(" input 넣은 사진 & 텍스트 확인 file, body 👉👉" , file, body);
            // console.log(" input 넣은 사진 & 텍스트 확인 decode 👉👉" , req.decode);
            // console.log(" input 넣은 사진 & 텍스트 확인 decode 👉👉" , req.decode.id);
    
        // 2) sequelize 상속받은 Post 객체로 쿼리 날리기 

        try {
            await Post.create({
                user_id : 'dj', 
                    // 임의로 넣음 ✅✅
                    // login 성공하면 👉 거기에서 가져오기 ✅✅ 
                status : 1,
                    // [기본값] 1로 설정
                    // [고민]
                        // 공개 = 1 = 게시판에서, 모두에게 다 보임,  
                        // 삭제 = 0 = 게시판에서, 삭제. | 마이페이지에는 있음. | 

                views : 1,
                    // [기본값] 1로 설정 
                        // models > post.js 에서 'defaultValue: 1' 이렇게 설정할 수도 있어. ✅✅ 
                    // [추가할 일]
                        // item 덩어리가 클릭되면 > 여기가 숫자가 올라가게 하기 

                user_primaryKey : 2,
                    // 왜냐면, 지금 dj 가 유저테이블상 id 2번 임 
                    // [이슈]
                        // 이 지금 로그인 한 계정은 user 테이블에 들어가고, 그 user 테이블의 id 가 있겠지 
                        // decode.id 에 찍힌 아이디가, 바로 그 user 테이블에 있는 그 id 인건가? ❓❓❓
                        // 이게 살짝 불확실해 ⭐⭐⭐⭐⭐

                // post_primaryKey 
                    // [궁금한 거]
                        // 근데, 이건 왜 있지❓❓❓❓❓ 

                title : body.title, 
                content : body.content, 
                post_img : file.filename,       // 근데 이걸 넣으면, 보여지나❓❓❓
            })
                // user_id 도 뭔가 연결로 넣어줘야 하는데 😥😥😥😥😥😥

        } catch (error) {
            console.log(error)
        }


        // 3) 사용자가 봤으면 하는 화면으로 redirect 시키기
            // '그림 상세 페이지' 로 확정
            res.json({ redirectURL: 'http://127.0.0.1:5500/Monami/frontEnd/boardItem.html' });
                // [해석]
                    // json 형식으로 변환해서 res 로 보냄 
                    // 그 이유는 axios 를 통해 소통하면, 클라이언트가 redirect 를 자동으로 처리 못 하는 경우가 있다고 함 (by GPT)
    }




// [read] 게시글 상세 페이지 보여주기
    exports.boardItemView = async (req, res) => {

        try {
            // 1) 조회할 id 가 제대로 넘어오는가 
                // console.log("req.params.id 👉 " , req.params.id);
                // req.params.id 를 하는 이유 : routing url 에서 placeholder 에 담겨서 id 가 넘어왔기 때문에 
                // console.log("req.decode.id🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️" , req.decode.id)
                // console.log("req.decode.id🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️🙆‍♂️" , req.decode)


            // 2) User 데이터 조회
                const userWithPosts = await User.findOne({
                    where : {id : 2}, 
                    include : [
                        {model : Post}
                    ]
                });

                console.log("🎏🎏🎏🎏🎏 userWithPosts : 유저 정보랑, 그 유저가 쓴 post 정보 가져와줘 👉" , userWithPosts)
            // 2) Post 데이터 조회 
                const 

            // 3) Comment 조회 
                const comment = await Comment.findOne( {
                    where : {post_primaryKey : 2}
                        // [해석] 
                            // 이게 맞나 ❓❓❓ 📛📛📛📛📛📛 
                            // 이 쿼리문이 어렵네 ⭐⭐⭐⭐⭐ 
                            // 이게 지금 핵심 기술이네 ⭐⭐⭐⭐⭐⭐⭐ 
                } )
                console.log("🎏🎏🎏🎏🎏 comment 정보 | 위에 userWithPosts 이거랑 연결해야 하나?" , comment)
                    // 👉 이건 아직 안 들어옴 
                    // 👉 이건, post 를 저장할 때, foreignKey 저장도 같이 해주는 걸 고려해야 함
                
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
                    comment : comment
                }
                console.log("🎏🎏🎏🎏🎏" , result)
            
            // 6) 결과 보내기 
                res.json(result)

        } catch (error) {
            console.error(error);
        }
    }



// [create]
    exports.boardCommentCreate = async (req, res) => {
    
        try {
            // 1) 저장할 데이터 솎아내기 
                // console.log("👲👲👲👲👲 req 보기 " , req);
                // console.log("👲👲👲👲👲 axios 로 날린거 보기" , req.body);
                    // 음... 봐도 모르겠는데 

                const { comment_write } = req.body;
                console.log("👲👲👲👲👲 댓글 쓴게 보여?" , comment_write)

            // 2) sequelize 상속받은 Comment 객체로 쿼리 날리기 
                await Comment.create({
                    content : comment_write, 
                    connect_id : 6,       // 이게 그 user 테이블의 id? ❓❓❓
                    connect_writer : "hi",    // 맞나? ❓❓❓
                    user_primaryKey : 1, 
                    post_primaryKey : 2,
                        // 글쓰는 대상이 정해지면 -> 따라오게 해야 함 
                        // 우선, 지금은 임의로. | dj 가 적은 id 2 인 글! 
                })


            // 3) res 보내기 
                res.send("댓글 작성 완료👏👏")
                
            } catch (error) {
                console.log(error)
                
            }

    }