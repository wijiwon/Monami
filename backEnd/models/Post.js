const Sequelize = require("sequelize");

class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // 유저의 '닉네임' 
            user_id : {
                type: Sequelize.STRING(20),
                allowNull: false
            },

            // 게시글 '제목' 
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            // 게시글 작성하는 '텍스트 내용'
            content: {
                type: Sequelize.STRING(300),
                allowNull: false
            },

            // 게시글 작성과 함께 올리는 '태그들' 
            tags : {
                type : Sequelize.STRING(200), 
                allowNull : false
            },
            
            // 게시글에 올리는 '사진'
            post_img: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            // 게시글 공개 여부
            status: {
                type: Sequelize.INTEGER(10),
                allowNull: false,
                defaultValue : 1    
            },
                // [설명] 공개 = 1, 삭제 = 0(DB엔 남아있음), 비공개(DB & MYPAGE 에는 남음) = 2, 

            // 조회수 
            views: {
                type: Sequelize.INTEGER(10),
                allowNull: false,
                defaultValue : 1       
            },

            // 좋아요 숫자
            likes : {
                type : Sequelize.INTEGER(100), 
                allowNull: false,
                defaultValue : 0
            },

            // 좋아요 클릭한 유저
            likeClickUser: {
                type: Sequelize.STRING(100)
            }, 

            deletedAt : {
                allowNull: true,
                type: Sequelize.DATE
            }

            // // user_primaryKey 외래키 | 외래키 기본값은 null 로 해놔야 왜 ❓❓❓❓❓ 
            // user_primaryKey : { 
            //     type : Sequelize.INTEGER(100), 
            //     defaultValue : null, 
            //     allowNull : false
            // },

        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Post",
            tableName: "posts",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }
    static associate(db){

        db.Post.belongsTo(db.User, {foreignKey: "user_primaryKey", sourceKey: "id"})
        // db.Post.hasMany(db.User, {foreignKey: "user_id", sourceKey: "id"})
            // [필요성] 해당 id 로 작성한, 가장 최신 글 보여주기 위해 필요
            // [팀회의] 해당 id 로 저장된 글을 조회할 때 가져오게 됨 (23-06-08 update | 팀컨펌 아직 | ✅)
            // [이슈사항] user_id 가 아닐 수도 있음✅

        // [새로운 방식] comment 와 post 간의 관계를 다시 설정 
            db.Post.hasMany(db.Comment, {foreignKey: "post_primaryKey", sourceKey: "id"})
            // [해석] ⭐⭐⭐⭐⭐⭐⭐⭐⭐
                // User 가 많은 post 를 쓸 수 있으니가 > User.hasMany 인 것 처럼 
                // Post 가 많은 comment 를 가질 수 있으니까 > Post.hasMany 로! 쓴다 
        // [예전방식]
            // db.Post.belongsTo(db.Comment, {foreignKey: "post_primaryKey", sourceKey: "id"})

    }
}

module.exports = Post;