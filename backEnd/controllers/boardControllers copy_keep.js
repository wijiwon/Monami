

const { decode } = require('jsonwebtoken');
const {User, Post , Comment} = require('../models/index');
const path = require("path");
const { error } = require('console');

// [READ] 게시판에서 모든 게시글 보여주기 
    exports.allBoardView = async (req, res) => {
        // 보여주는 쿼리 쓰고 

        // res 하기 
    }

// [READ] 글쓰기 페이지 보여주기 
    exports.boardCreateView = async(req, res) => {

        if (req.decode && req.decode.id) {
            console.log("req.decode.id 👉👉👉👉👉" , req.decode.id )
        } else {
            console.log("req.decode is undefined.")
        }


        console.log("☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝")
        console.log(req.decode)
        console.log(req.decode.id)

        console.log("🎏🎏🎏🎏🎏🎏🎏 여기까지 옴!!!!! ")
        res.redirect("http://127.0.0.1:5500/Monami/frontEnd/boardCreate.html")
}


// [CREATE] 게시판 글쓰기 
    exports.boardCreate = async (req, res) => {


        if (req.decode && req.decode.id) {
            console.log("req.decode.id 👉👉👉👉👉" , req.decode.id )
        } else {
            console.log("req.decode is undefined.")
        }

        // 1) 저장할 데이터 솎아내기 
        console.log("📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌" , req);
        const {file, body} = req;
            
            console.log("req.decode.id 👉👉👉👉👉" , req.decode.id )
            console.log("req 에서 file, body 분리 됐나 확인 👇 @boardController")
            // console.log("req.body, req.file : " , req.body, req.file)

            // console.log("req.decode 값 확인 👇 @boardController")
            // console.log(req.decode)

    
        // 2) sequelize 상속받은 Post 객체로 쿼리 날리기 
        try {
            const newPost = await Post.create({
                user_id : req.decode.user_id, 
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

                user_primaryKey : req.decode.id,    // 현재 dj 가 id 2번이라 임시로
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


            // POST 생성 후 User 의 exp 1 증가 | ⭐⭐⭐⭐⭐⭐⭐⭐ 
                const user = await User.findOne(
                    {where : {id : req.decode.id}}
                );

                if (user) {
                    user.exp += 1
                    await user.save();
                } else { 
                    console.log("exp 증가 저장 못 했어")
                }


                
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
                        // res.json({ redirectURL: `http://127.0.0.1:4000/board/item/${id_post}` });
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


        try {
            // 0) 필요한 값 확인 및 할당
                console.log("@ boardController > boardItemView 입성")
                console.log("islogin 실행 후 값 들어오는지 보자 💁‍♀️" )
                console.log("islogin 실행 후 값 들어오는지 보자 💁‍♀️" ,  req.decode)

                const _userTable_ID = req.decode.id 
                const _userTable_userId = req.decode.user_id 
                const postId = req.query.id;

            // 1) 로그인한 유저 정보 
                const loginUser = {
                    _userTable_ID : _userTable_ID, 
                    _userTable_userId : _userTable_userId
                }

            // 2) User 테이블에서, data 가져오기
                const userWithPosts = await User.findOne({
                    where : {id : _userTable_ID},   
                        // ✅ 현재 dj 가 id 2 라서 설정함
                        // 이제, 세션에 저장된걸로 대체하기 : _userTable_ID
                    include : [
                        {model : Post}
                    ]
                });

                console.log(" userWithPosts 데이터 확인 @boardItemView" )
                // console.log(" userWithPosts 데이터 확인 @boardItemView" , userWithPosts)
            
            // 2) Post 테이블에서, data 가져오기
                const postWithComments = await Post.findOne({
                    where : {id : postId}, 
                        // post 테이블 id 8번에 댓글이 여러개 있어 설정함
                        // 여기에 지금 작성중인 postId 값이 넘어와야 함 
                        // axios 를 통해 넘어올 수 밖에 없는데? 
                    include : [
                        {   
                            model : Comment , 
                            include : {model : User}
                        } , 
                        {   
                            model : User
                        }
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
                    loginUser : loginUser,
                    comment : postWithComments,
                }
                console.log("게시글 상세에서 보여줄 데이터가 다 들어있나 @boardItemView")
                // console.log("게시글 상세에서 보여줄 데이터가 다 들어있나 @boardItemView" , result)
            
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

                console.log("게시글 클릭한 유저 = view 1 증가, 누구? " , req.params.id_post)

            // 2) 이걸 거쳤다 = 봤다 = view 1 증가! 

                // 클릭된 게시글 ID 
                    const clickedPostID = req.params.id_post
            
                // post 테이블에서 postid 에 해당하는 row 찾기 | 좋아요 버튼 증가에서 만든거 가져옴 ✅
                const post = await Post.findByPk(clickedPostID)
                
                // 찾았는데 없으면 에러 메시지
                if(!post) {
                    console.log("그 포스트 id 에 해당하는 포스트 없어");
                    return
                }

                // 있으면, views 속성 값 1 증가 
                await post.increment('views' , {by : 1});
                
                // 클릭한 유저 이름을 추가 👉 여기에선 굳이 할 필요는 없음 | 좀 더 심도있는 데이터 분석을 하려면 필요 
                    // const clickeUserUpdatePost = await post.update( {likeClickUser : clickedPostUserID} );

                // views 업데이트 한거 확인 
                console.log("조회수 숫자 업데이트 함!" );
                

            // 3) boardItem 보여주기 
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


// [create] 게시판 댓글 생성 
    exports.boardCommentCreate = async (req, res) => {
    
        try {
            // 1) 저장할 데이터 확인
                console.log("@@@ boardController > boardCommentCreate 진입!")
                // // console.log("🛴 클라에서 axios 로 받은거  보기" , req.body);
                // console.log("| 댓글 내용 " , req.body.content)
                // console.log("| 댓글 작성한 유저 id" , req.body.user_primaryKey)
                // console.log("| 댓글의 '대상이 되는 게시글 id'" , req.body.post_primaryKey)
                // console.log("| 대댓글의 경우 '대상이 되는 댓글 id' : 1) 원본댓글 = 0 , 2) 대댓글은, '타겟 댓글의 comment 테이블 id' 가 들어와야함" , req.body.id_of_targetComment)
                // console.log("| writer_of_targetComment : 대댓글의 타겟 댓글 작성자 id" , req.body.writer_of_targetComment)
                
                // 댓글 내용
                // const temp_write = req.body.content;
                
                // 댓글 작성한 유저 id
                // const temp_user_primaryKey = req.body.user_primaryKey;
                
                // 댓글의 '대상이 되는 게시글 id'
                // const temp_post_primaryKey  = req.body.post_primaryKey;

                // 대댓글의 경우 '대상이 되는 댓글 id'
                // const temp_id_of_targetComment = req.body.id_of_targetComment;

                // 대댓글의 경우 '대상이 되는 댓글의 작성자' 
                // const temp_writer_of_targetComment = req.body.writer_of_targetComment;


            // 2) sequelize 상속받은 Comment 객체로 쿼리 날리기 
                const newComment = await Comment.create({
                    // 댓글 작성 내용
                    content : req.body.content,
                    
                    // 댓글 작성한 유저의 user 테이블 상의 id 
                    user_primaryKey : req.body.user_primaryKey,

                    // 댓글 작성 대상이 된 '대상 게시글의 id' (post 테이블에서 가져오기)                    
                    post_primaryKey : req.body.post_primaryKey,

                    // 대댓글 작성 대상이 되는 '대상 댓글의 id' (comment 테이블에서 가져오기)
                    id_of_targetComment : req.body.id_of_targetComment,

                    // 댓글 작성 대상이 되는 '대상 댓글을 쓴 유저' (comment 테이블에서 가져오기)
                    writer_of_targetComment : req.body.writer_of_targetComment
                })


            // 3) res 보내기 

                // 방금 만들어진 댓글 id 값 가져오기 
                    const id_newComment = newComment.id
                
                // 댓글의 대상이 되는 게시글의 id 가져오기 
                    const id_post = newComment.post_primaryKey
                    
                // 대댓글의 대상이 되는 원본 댓글 ID 가져오기
                    const reComment_original_commentID = newComment.id_of_targetComment
                    // const id_post = temp_post_primaryKey
                    // [해석] ⭐⭐⭐ | 나중에 잊어버릴거 같아 
                        // 1) '글쓰기 페이지(boardCreate.html)' 에서, 기입하고, 버튼 누르면, 게시글 id 가 url 에 담겨짐 
                        // 2) boardItem 에서는 getAPI() 에서 가져와서 👉 URL 경로에서 ID 값만 빼냄 
                        // 3) 그리고 ⭐'전역 변수 postId' 로 저장함 (SCOPE 주의)
                        // 4) 이 postId 를 댓글 클릭할 때 가져와서 이쪽에서 활용

                    // [requirement] 
                        // URL 형식은 '게시글id' + '댓글 id' 들 다 여야 함 
                        // '게시글 id 가 필요한 이유' = 댓글의 target 이 되기 때문
                    
                    console.log("@boradController > boardCommentCreate 까지 왔음!")
                    console.log("방금 작성한 '댓글 ID'" , id_newComment)
                    console.log("방금 작성한 댓글의 대상이 되는 '게시글ID' " , id_post)
                    console.log("대댓글 시, '원본 댓글 ID'" , reComment_original_commentID)

                    // 1) 이렇게 보내면 작동함
                        // res.redirect(`http://127.0.0.1:4000/board/item/${id_post}`)

                    // 2) 다만, 새로고침 되는게 싫어서 이렇게 보내보자 다시. 
                        
                    
                        // 예전방식 - 작동함🔵
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

// [GET] comment 테이블 에서 필요한 데이터 가져오기 
    exports.commentDataGet = async (req, res) => {

        try {
            // 클라에서 데이터가 잘 넘어오는지 확인 
                console.log("@boardController > commentDataGet : " , req.query)     //  id_of_targetComment: '66' }
                console.log("@boardController > commentDataGet : " , req.query.id_of_targetComment) // 66
                console.log(req.body)

            // comment 테이블에서 '타겟 댓글 id' 에 해당하는 row 가져오기 
                const originalCommentID = await Comment.findAll({
                    where : {id_of_targetComment : req.query.id_of_targetComment}
                });
                console.log("대댓글 작성중 | 해당 게시글에 작성한 모든 대댓글")
                // console.log("대댓글 작성중 | 해당 게시글에 작성한 모든 대댓글" , originalCommentID)

            // 결과 보내기 
                res.json(originalCommentID)
            
        } catch (error) {
            console.log(error)
        }
    }




// 좋아요 버튼 
    exports.likesBtn = async (req,res) => {

        const _likeClickUsers = []
        try {
            // 필요한 데이터 도착 확인
            console.log("📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌📌")
            console.log("@controllers > likesBtn 입성")
            console.log("req 📌" , req)
            console.log("req.data 📌" , req.data)
            console.log("req.body 📌" , req.body)
            // console.log("req.body likeClickUserID📌" , req.body.likeClickUserID)
            // console.log("req.body likeClickUserUserID📌" , req.body.likeClickUserUserID)
            // console.log("req.body clickedPostID📌" , req.body.clickedPostID)
            
            console.log( "req 에 뭐가 들었나?" , req.decode ) 
            console.log( "req.decode.id 여기에는? 🚀🚀🚀🚀🚀" , req.decode.id ) 

            const clickedPostID = req.body.clickedPostID;
            // const clickedPostUserID = req.body.likeClickUserUserID;
            const clickedPostUserID = req.decode.user_id;
            console.log("clickedPostID📌" , clickedPostID)  // 🔵 clickedPostID📌 65
            console.log("clickedPostUserID" , clickedPostUserID)  
            console.log("clickedPostUserID 를 갖고 오고 싶었음." , req.decode.id)  
            console.log(req.body.data)


            // [새로운 시도] 🔵 작동함 | 

                // 1. post 테이블에서 postid 에 해당하는 row 찾기
                const post = await Post.findByPk(clickedPostID)
                
                    // 1.1 찾았는데 없으면 에러 메시지
                    if(!post) {
                        console.log("그 포스트 id 에 해당하는 포스트 없어");
                        return
                    }

                // 2. 기존 체크 이력 확인 
                    // [해석] clickedPostUserID 이 값이 post테이블의 clickedPostID값  likeClickUser 속성값 안에 있니? 
                const clickedPostData = await Post.findOne({
                    where : {
                        id : clickedPostID
                    }
                })
                    console.log("🙌🙌🙌 클릭된 게시글에 들어있는 것 : " , clickedPostData)
                    console.log("방금 클릭한 게시글에 기존 좋아요 클릭 유저 : " , clickedPostData.likeClickUser)


                // 3. 기존에 좋아요 클릭한 유저 있는지 여부 확인 -> 비어있으면, 좋아요 명단에 추가
                if (clickedPostData.likeClickUser != null) {
                    _likeClickUsers.push(clickedPostData.likeClickUser.split(','));
                }
                    console.log("🙌🙌🙌🙌🙌🙌 이 게시글에 좋아요를 클릭한 유저들 모음 :" , _likeClickUsers)


                // 4. '좋아요 기존 명단' vs '방금 클릭한 유저' 비교 
                    // 👉 포함되어 있지 않다면 -> 1) 좋아요 1 증가 실행 2) 좋아요 명단에 추가 

                if (_likeClickUsers.length == 0 || !_likeClickUsers[0].includes(clickedPostUserID)) {

                    console.log("텅 비었거나, 포함되어 있지 않거나 👉 like increase 1 가능한 상황")
                    
                    // 중복 클릭 아니면, likes 속성 값 1 증가 
                    await post.increment('likes' , {by : 1});
                    
                    // 클릭한 유저 이름을 추가 
                    _likeClickUsers.push(clickedPostUserID)
                    console.log("좋아요 클릭 유저 추가" , _likeClickUsers)

                    const clickeUserUpdatePost = await post.update( {likeClickUser : _likeClickUsers.join(',')} );
    
                    // 유저 업데이트 한거 확인 
                    console.log("좋아요 클릭버튼 유저 업데이트 완료" , clickeUserUpdatePost);

                } else {
                    console.log("좋아요 중복 클릭임!🙅‍♀️🙅‍♂️")
                }
                
                // 클라에 보내기
                res.json({message : 'success'})

                // [과거 코드] 작동함 🔵 | 다만, post.findBypk 가 반복되는 것 같아 줄여보기 

                    // // post 테이블의 좋아요 컬럼에 저장하기 : 특정 게시글에 특정 열 값을 추가! 해야 함.
                    //     await Post.findByPk(clickedPostID)
                    //         .then((post) => {
                    //             // [해석] 
                    //                 // post는 Post.findByPk(clickedPostID) 호출로 찾아낸 특정 post 행(row) 임. ⭐⭐
                    //             if (!post) { 
                    //                 console.log("그 포스트 id 에 해당하는 포스트 없어")
                    //             } else {
                    //                 return post.increment('likes' , {by : 1});
                    //             }
                                
                    //         }).then((post) => {
                    //             // [해석]
                    //                 // console.log(`1증가 시킨 결과물 : ${post.likes}`)
                    //                 // console.log(`post 에 담긴 것들 : ${JSON.stringify(post.toJSON() , null, 2)}`)
                    //                     // 이렇게 하는 이유 | 그냥 post 만 하면, 이상한 값이 나와서
                    //                     // JSON.stringify | javascript 객체를 JSON 문자열로 변환 
                    //                     // null, 2 | stringfy 의 인자. 선택적임. | 모든 속성에 적용되며, 들여쓰기에 2개의 공백문자를 쓴다.
                    //                             // | 이로인해 '가독성' 이 좋아짐
                    //                     // post.toJSON() | 모든 sequelize 객체가 아니라, 'post 테이블이 가진 데이터' 만 필요한 경우 
                    //                 // const newPost = JSON.stringify(post.toJSON() , null, 2)
                    //                 // const currentLikes = newPost.likes
                                
                    //             // 결과물 찍어보기
                    //             // console.log("Post 테이블 특정 id 의 row 에서, 수정된, row  : " , post)
                    //             // console.log("Post 테이블 특정 id 의 row 에서, 수정된, row 중 likes 값: " , post.likes)  // 작동함 🔵
                    //                 // [이슈]
                    //                     // 실제로 업데이트 된 값이 실시간으로 나오는지 여부 
                    //                         // no 한박자 늦게 나옴 
                    //                         // 새로고침을 한번해서, DB 값을 가져와야 최신 LIKES 로 개정이 됨. 
                    //                     // 방법 
                    //                         // 1) 업데이트가 아직 덜 된 값에 +1 을 해서 보내는 방법 
                    //                         // 2) GET API 를 호출할 때 마다, 새롭게 업데이트 된 DB 값을 가져와서 그려주는 법 
                    //                     // 즉, 문제는? 
                    //                         // 지금 여기서 보는 DB 가 완전 최신이 아님 
                    //                         // 그러면, 이 상황에서, 다시, boardItem 을 부른다면? 다시 getAPI 를 해서 최신을 받아오지 않을까? 

                    //                 // 클라한테 보내려고 만들었는데, 이거 없어도 likes 업데이트 잘 됨
                    //                     // const likesBtn = {
                    //                     //     likes : post.likes
                    //                     // }
                                
                    //             // 우선 보내기 
                    //                 res.json();
                    //         })

                    // // post 테이블의 likeClickuser 컬럼에 해당 id 추가하기 
                    //     await Post.findByPk(clickedPostID)      // post id 로 업데이트할 row 찾음 ⭐
                    //         .then((post) => {
                    //             // 유저 이름을 업데이트 하기 
                    //             return post.update({
                    //                 likeClickUser : 'dj'
                    //             });
                    //         })
                    //         .then((updatedPost) => {
                    //             console.log("좋아요 클릭버튼 유저 업데이트 완료" , updatedPost)
                    //                 // updatedPost 에는 유저 이름 업데이트 한 그 row 가 담김
                    //         })
                    //         .catch ((error) => {
                    //             console.log(error)
                    //         });
        } catch (error) {
            console.log(error)
        }
    }

    // 좋아요 증가 하는 함수 
    likeIncrease = async () => { 
        // 중복 클릭 아니면, likes 속성 값 1 증가 
        await post.increment('likes' , {by : 1});

        // 클릭한 유저 이름을 추가 
        _likeClickUsers.push(clickedPostUserID)
        console.log("좋아요 클릭 유저 추가" , _likeClickUsers)

        const clickeUserUpdatePost = await post.update( {likeClickUser : _likeClickUsers.join(',')} );

        // 유저 업데이트 한거 확인 
        console.log("좋아요 클릭버튼 유저 업데이트 완료" );
        console.log("좋아요 클릭버튼 유저 업데이트 완료" , clickeUserUpdatePost);
    }



// GET | [게시판 목록 보여주기]

exports.boardListPages = async (req, res) => {

    try {
        // 0) 필요한 데이터 들어왔는지 확인
            console.log("@ boardController > boardListPages 게시판 목록 입성")
            console.log("islogin 실행 후 값 들어는가🛴 " ,  req.decode)
            
            // console.log(req)
            // console.log(req.page)
            // console.log(req.body.page)

                // [고민]
                    // 게시글 상세는, 게시글이 저장되는 순간, POST ID 를 가져옴 
                    // 이번에는 그러지 못 할 것 같음. 
                    // 이번에는 DIV 가 생성될 때, 들고 있어야 함 ⭐⭐⭐ 

                    // 우선, 
                        // 1) '게시글을 다 들고와' (이때, 1) ID 순? 2) 이름순? 3) 조회순? 등등으로 보여질 수 있을 것)
                        // 2) 그걸, 클라한테 넘겨 | ✅ 여기까지가 boardListPages 이 할일 ✅ 
                        // 3) 클라에서 갖고 있는 걸로 for 문 돌려서 다 그려 | boardlist 가 할일  
                        // 4) 그 다음 클릭하면, POST ID 뽑아내 -> 그걸로 이제 상세 페이지 들어가 
                        // 5) 각 테이블에 있는 data 가 있으면 -> 어떻게든 가져와서 쓸 수 있음. ⭐ 

        // 1) 로그인한 유저 정보 
            const _userTable_ID = req.decode.id 
            const _userTable_userId = req.decode.user_id 
            // console.log("@boardListPages | _userTable_ID " , _userTable_ID)
            // console.log("@boardListPages | _userTable_userId " , _userTable_userId)

            const loginUser = {
                _userTable_ID : _userTable_ID, 
                _userTable_userId : _userTable_userId
            }
            
        // // 2) User 테이블에서, data 가져오기 
        //     const userWithPosts = await User.findOne({
        //         where : {id : _userTable_ID},   
        //         include : [
        //             {model : Post}
        //         ]
        //     });
                // [게시판 상세 코드]
                    // const userWithPosts = await User.findOne({
                    //     where : {id : _userTable_ID},   
                    //     include : [
                    //         {model : Post}
                    //     ]
                    // });
            // console.log("@boardListPages | userWithPosts 데이터 확인 " , userWithPosts)


        // // 3) Post 테이블에서, data 가져오기
        //     const postsByAllUser = await Post.findOne({
        //         // where : {id : postId}, 
        //         include : [
        //             {model : Comment}
        //         ]
        //     });
        //     [고민] 
        //         이번엔 comment 는 굳이 필요없으려나? 우선, 갖고와 


        // 4) 전부 다, 외래키 활용해서, include로 가져오기 ⭐⭐⭐ 
            const postsWithCommentsUsers = await Post.findAll({
                include : [
                    {model : Comment},
                    {model : User}
                ]
            })

        // 5) 합치기 
            const result = {
                loginUser : loginUser, 
                postsWithCommentsUsers : postsWithCommentsUsers, 
                // post : postsByAllUser,  // 🔵 
            }
            // console.log("@boardListPages | '게시판 목록' 에 보여줄 데이터 다 들어왔나" , result)

        // 5) 클라이언트에 보내기 
            res.json(result)


    } catch (error) {
        console.log(error)
    }

}


// [GET] 페이지네이션
    exports.pagenation = async (req, res) => {

        try {
            // 0) 데이터 들어오는 값 확인
                console.log("@pagenation 입성 💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️💁‍♀️")
                // console.log("query 문에서 받아졌나요~" , req.query)     // { num: 'page_btn_3'}
                // console.log("query 문에서 받아졌나요~" , req.query.num)     // page_btn_3
                // console.log("query 문에서 받아졌나요~" , req.query.num.split('_')[2] )     // 3
                // console.log("query 문에서 받아졌나요~" , req.query.page)
            

                // 정렬시 선택한 것
                const orderOption = req.query.order  // views, likes, createdAt 중 하나가 들어와야 함
                console.log("orderOption 잘 들어오나🚀🚀🚀🚀🚀🚀" , orderOption)
                
                // 한 페이지당 몇개 포스팅?;
                const postsPerPage = 32;

                // 사용자가 보고싶어서 누른 페이지
                const page = req.query.num
                console.log("페이지 잘 들어오나 ✍✍✍✍✍✍✍✍" , page)

                // 한 페이지에서 몇 개의 포스팅을 보이게 할 것 인가. 
                const limit = postsPerPage     // 임시📛 

                // Post 테이블 중 '어디에서 부터' 데이터를 가져올 것 인가.
                const offset = limit * (page - 1)


            // 1) 로그인 유저 
                // const loginUser = {
                //     _userTable_ID : _userTable_ID, 
                //     _userTable_userId : _userTable_userId
                // }


            // 2) sequelize 페이지네이션  

            if (orderOption === 'views') {
                let postsWithCommentsUsers = await Post.findAll({
    
                    limit : limit,        // 한 페이지에 몇 개의 포스팅이 보이게 할 것 인가
                    offset : offset,        // post 에서, 몇 번째 POST ID 에서 찾을 것 인가 
                    include : [
                        {model : Comment},
                        {model : User}
                    ], 
                    // order : [[`${orderOption}` , "DESC"]]     // '들어온값' 이 '제일 위' 로 오도록
                    order : [["views" , "DESC"]]     // '조회수' 가 '제일 위' 로 오도록
                    // order : [["likes" , "DESC"]]     // '좋아요' 가 '제일 위' 로 오도록
                    // order : [["createdAt" , "DESC"]]     // '최신순' 이 '제일 위' 로 오도록
                    
                });
                // console.log( "@pagenation , sequelize 에서 필요한거 받나? ")
                // console.log( "@pagenation , sequelize 에서 필요한거 받나? ", postsWithCommentsUsers)
            } else if (orderOption === 'likes') {
                let postsWithCommentsUsers = await Post.findAll({
    
                    limit : limit,        // 한 페이지에 몇 개의 포스팅이 보이게 할 것 인가
                    offset : offset,        // post 에서, 몇 번째 POST ID 에서 찾을 것 인가 
                    include : [
                        {model : Comment},
                        {model : User}
                    ], 
                    // order : [[`${orderOption}` , "DESC"]]     // '들어온값' 이 '제일 위' 로 오도록
                    // order : [["views" , "DESC"]]     // '조회수' 가 '제일 위' 로 오도록
                    order : [["likes" , "DESC"]]     // '좋아요' 가 '제일 위' 로 오도록
                    // order : [["createdAt" , "DESC"]]     // '최신순' 이 '제일 위' 로 오도록
                    
                });
            } else if (orderOption === 'createdAt') {
                let postsWithCommentsUsers = await Post.findAll({
    
                    limit : limit,        // 한 페이지에 몇 개의 포스팅이 보이게 할 것 인가
                    offset : offset,        // post 에서, 몇 번째 POST ID 에서 찾을 것 인가 
                    include : [
                        {model : Comment},
                        {model : User}
                    ], 
                    // order : [[`${orderOption}` , "DESC"]]     // '들어온값' 이 '제일 위' 로 오도록
                    // order : [["views" , "DESC"]]     // '조회수' 가 '제일 위' 로 오도록
                    // order : [["likes" , "DESC"]]     // '좋아요' 가 '제일 위' 로 오도록
                    order : [["createdAt" , "DESC"]]     // '최신순' 이 '제일 위' 로 오도록
                    
                });
            } else {
                let postsWithCommentsUsers = await Post.findAll({
    
                    limit : limit,        // 한 페이지에 몇 개의 포스팅이 보이게 할 것 인가
                    offset : offset,        // post 에서, 몇 번째 POST ID 에서 찾을 것 인가 
                    include : [
                        {model : Comment},
                        {model : User}
                    ], 
                    // order : [[`${orderOption}` , "DESC"]]     // '들어온값' 이 '제일 위' 로 오도록
                    // order : [["views" , "DESC"]]     // '조회수' 가 '제일 위' 로 오도록
                    // order : [["likes" , "DESC"]]     // '좋아요' 가 '제일 위' 로 오도록
                    order : [["createdAt" , "DESC"]]     // '최신순' 이 '제일 위' 로 오도록
                
            
            }
            


            // 5) 합치기 
                const result = postsWithCommentsUsers
                    
                console.log("@pagenation | 데이터 다 나가고 있니")
                // console.log("@pagenation |💨💨💨💨💨💨💨💨💨💨💨" , result)

            // 5) 클라이언트에 보내기 
                // a) res.json로 redirect 보내면서, 2) result 를 담아서 보내자
                    // res.json({ 
                    //     redirectURL: `http://127.0.0.1:4000/board/list` ,
                    //     result : result
                    // });                    
                    // [내가 원하는 것]
                        // 1) 게시판 목록 페이지가 나오면서, 2) 데이터 까지 같이 넘어가는 것

                // a-1) 시도 
                    // /board/list 로 보내보자
                        // 하고 싶은건 기본 목록 페이지로, 데이터 들고가기
                        // 그러면, 어디로 가게 되나? 
                        // 그냥, 기본 list 를 그리게 되나? 
                        // 어디로 가서 어떻게 실행되는가, 이건 redirect 에서도 만났던 문제 😥😥😥
                    // res.json({
                    //     redirectURL : "http://127.0.0.1:4000/board/list", 
                    //     result : result
                    // })
                    // 👉 안 나온다. 

                // a-2 ) 시도 
                    // 새롭게 라우터를 파서, 그 경로로 오면, 이것만 처리하게 
                    
                    
                    res.json({
                            // redirectURL : "http://127.0.0.1:4000/board/list/pagenation", 
                            data : result
                        })

                    // // 2) [클라이언트에 기재] redirect 방식 -> 🔵 작동함 | 다만 새로고침이 싫음 
                    //     const redirectURL = response.request.responseURL;
                    //     console.log("redirectURL 이게 어떻게 넘어오지? 🕵️‍♂️ @boardItem" , redirectURL)
                    //     console.log("redirectURL 이게 어떻게 넘어오지? 🕵️‍♂️ @boardItem" , response.request.responseURL)
                    //     window.location.href = redirectURL;

                
                // b) sendFile 버전
                    // res.sendFile(path.join (__dirname , "../../frontEnd/boardList.html"));
                    // 그런데, 📛 sendFile 은 data 를 담아서 넘기지 못 함 
                    
                // b-1) sendFile + data 넘기기 버전
                    // 그런데, 📛 sendFile 은 data 를 담아서 넘기지 못 함 


                // c) redirect + result 로 데이터 넘기고 -> redirect 페이지에서 sendfile 해야 하나


                // d) 자, 예전에, 넘겨줄 페이지 + 데이터 를 어떻게 가져왔었는지 보자 ⭐⭐⭐ 
                        

            
        } catch (error) {
            
            console.log(error)
        }

    }


// 특정 페이지로 들어왔을 때 보여주기
exports.pagenationView = (req, res) => {

    try {
        console.log("@pagenationView 입성")
        // console.log(req.result)
        // console.log(req.result[0].id)   // 첫 번째 item 의 id 
        // console.log(req.result[1].title)   // 두 번째 item 의 title
    
        // console.log(req.result)
    } catch (error) {
        console.log(error)
        
    }

}



// [게시판 목록] [get] 기본 페이지 보여주기 
    exports.defaultView = (req, res) => {


        // 1) 데이터 가져오기 


        // 2) 데이터 랑 주소랑 같이 보내기 



        res.sendFile(path.join(__dirname , "../../frontEnd/boardList.html"))
    }