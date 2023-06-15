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
    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: "user_primaryKey", sourceKey: "id" })
        db.User.hasMany(db.Question, { foreignKey: "user_primaryKey", sourceKey: "id" })
        db.User.hasMany(db.Drawing, { foreignKey: "user_primaryKey", sourceKey: "id" })
    }

}

module.exports = User;