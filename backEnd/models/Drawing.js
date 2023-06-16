const Sequelize = require("sequelize");

class Drawing extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content : {
                type: Sequelize.BLOB('long'),
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Drawing",
            tableName: "drawings",
            paranoid: false,
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci"
        })
    }
    static associate(db){
        db.Drawing.belongsTo(db.User, {foreignKey: "user_primaryKey", targetKey:"id"})
        db.Drawing.belongsTo(db.Question, {foreignKey: "question_primaryKey", targetKey:"id"})
        db.Drawing.belongsTo(db.Room, {foreignKey: "room_primaryKey", targetKey:"id"})
    }
}

module.exports = Drawing;