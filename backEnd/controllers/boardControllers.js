

const {User, Post} = require('../models/index');


// [READ] 게시판에서 모든 게시글 보여주기 
    exports.allBoardView = async (req, res) => {
        // 보여주는 쿼리 쓰고 

        // res 하기 
    }


// [CREATE] 게시판 글쓰기 
    exports.boardCreate = async (req, res) => {
        
        // 1) 저장할 데이터 솎아내기 
            const {file, body} = req;
            console.log(" input 넣은 사진 & 텍스트 확인 👉👉" , file, body);

        // 2) sequelize 상속받은 Post 객체로 쿼리 날리기 
            await Post.create({
                user_id : 3, 
                    // 임의로 넣음 ✅✅
                    // login 성공하면 👉 거기에서 가져오기 ✅✅ 
                status : 1,
                    // [기본값] 1로 설정
                    // [고민]
                        // 공개 = 1 = 게시판에서, 모두에게 다 보임,  
                        // 삭제 = 0 = 게시판에서, 삭제. | 마이페이지에는 있음. | 

                title : body.title, 
                content : body.content, 
                post_img : file.filename,       // 근데 이걸 넣으면, 보여지나❓❓❓
            })
                // user_id 도 뭔가 연결로 넣어줘야 하는데 😥😥😥😥😥😥


        // 3) 사용자가 봤으면 하는 화면으로 redirect 시키기
            // '그림 상세 페이지' 로 확정
            res.json({ redirectURL: 'http://127.0.0.1:5500/frontEnd/boardItem.html' });

            // res.redirect("http://127.0.0.1:5500/frontEnd/boardItem.html")

    }