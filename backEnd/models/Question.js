const Sequelize = require("sequelize");

class Question extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            connect_id: {
                type: Sequelize.INTEGER(10),
                allowNull: true
            }
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Question",
            tableName: "questions",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }
    static associate(db){
        db.Question.hasMany(db.Drawing, {foreignKey: "question_primaryKey", sourceKey: "id"})
        db.Question.belongsTo(db.User, {foreignKey: "user_primaryKey", targetKey:"id"})
        db.Question.belongsTo(db.Room, {foreignKey: "room_primaryKey", targetKey:"id"})
    }
}

module.exports = Question;