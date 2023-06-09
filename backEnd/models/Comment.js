const Sequelize = require("sequelize");

class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content: {
                type: Sequelize.STRING(300),
                allowNull: false
            },
            // 이게 지금 댓글 쓰는 사람의 id 인가? | 아니면, 댓글의 대상이 되는 원본 글 id 인가? 
                // 그러면, foreignKey 로 가져와야 하나? 
            connect_id : {
                type: Sequelize.INTEGER(10)
            },
            connect_writer: {
                type: Sequelize.INTEGER(10),
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