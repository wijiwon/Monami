const Sequelize = require("sequelize");

class Room extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            room_manager: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            users_in_room: {
                type: Sequelize.STRING(20)
            },
            play : {
                type : Sequelize.STRING(10),
                defaultValue : 0
            }
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Room",
            tableName: "rooms",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci"
        })
    }
    static associate(db){
        db.Room.hasMany(db.Drawing, {foreignKey: "room_primaryKey", sourceKey: "id"})
        db.Room.hasMany(db.Question, {foreignKey: "room_primaryKey", sourceKey: "id"})
    }
}

module.exports = Room;