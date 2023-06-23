const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            user_pw: {
                type: Sequelize.STRING(64),
                allowNull: false
            },
            username: {
                type: Sequelize.STRING(20)
            },
            profile_img: {
                type: Sequelize.STRING(200),
                // allowNull : false,
                // defaultValue : "http://127.0.0.1:4000/monami.gif"
            },
            exp: {
                type: Sequelize.INTEGER(10)
            },

            joinAllow : {
                type : Sequelize.INTEGER,
                allowNull : false,
                defaultValue : 0,
            }
        },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci"
            })
    }

    static associate(db){
        
        db.User.hasMany(db.Post, {foreignKey: "user_primaryKey", sourceKey: "id"})
        // db.User.hasMany(db.Post, {foreignKey: "user_id", sourceKey: "id"})
        // [필요성] 해당 id 로 작성한, 가장 최신 글 보여주기 위해 필요
        // [팀회의] 해당 id 로 저장된 글을 조회할 때 가져오게 됨 (23-06-08 update | 팀컨펌 아직 | ✅)
        // [이슈사항] user_id 가 아닐 수도 있음✅

        db.User.hasMany(db.Comment, {foreignKey: "user_primaryKey", sourceKey: "id"})
        db.User.hasMany(db.Question, {foreignKey: "user_primaryKey", sourceKey: "id"})
        db.User.hasMany(db.Drawing, {foreignKey: "user_primaryKey", sourceKey: "id"})
    }

}

module.exports = User;