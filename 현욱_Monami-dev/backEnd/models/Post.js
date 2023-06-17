const Sequelize = require("sequelize");

class Post extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id : {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(300),
                allowNull: false
            },
            post_img: {
                type: Sequelize.STRING(100)
            },
            status: {
                type: Sequelize.INTEGER(10)    
            },
            views: {
                type: Sequelize.INTEGER(10)
            },
            likeClickUser: {
                type: Sequelize.STRING(100)
            }
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Post",
            tableName: "posts",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }
    static associate(db){
        db.Post.hasMany(db.Comment, {foreignKey: "post_primaryKey", sourceKey: "id"})
    }
}

module.exports = Post;