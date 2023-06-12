const Sequelize = require("sequelize");

class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // 댓글 내용
            content: {
                type: Sequelize.STRING(300),
                allowNull: false
            },

            // 댓글 작성하는 유저의 id 
            user_primaryKey : {
                type : Sequelize.INTEGER(100), 
                allowNull : false, 
            },

            // '댓글 작성의 경우, 어떤 post 에 대해서 댓글을 작성하고 있는가' 를 알기 위한 post 테이블 의 id 
            id_of_targetPost_primaryKey : {
                type : Sequelize.INTEGER(100), 
                allowNull : false,
            }, 

            // '대댓글의 경우, 어떤 댓글을 대상으로 작성하고 있나.' 를 알기 위한 comment 테이블의 id 값 ❓❓
            id_of_targetComment : {
                type: Sequelize.INTEGER(100), 
                allowNull : false, 
            },

            // '대댓글의 경우, 어떤 '유저' 가 작성한 댓글을 대상으로 작성하고 있나.' 를 알기 위해 
                // comment 테이블의 id 값에서 추출해 저장하는 값❓❓
            writer_of_targetComment : {
                type: Sequelize.INTEGER(100),
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Comment",
            tableName: "comments",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }
    static associate(db){
        db.Comment.belongsTo(db.User, {foreignKey: "user_primaryKey", targetKey: "id"})
        db.Comment.belongsTo(db.Post, {foreignKey: "post_primaryKey", targetKey: "id"})
    }
}

module.exports = Comment;