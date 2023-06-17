const Sequelize = require("sequelize");

const config = require("../config");
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Room = require("./Room");
const Question = require("./Question");
const Drawing = require("./Drawing");

const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
)

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Room = Room;
db.Question = Question;
db.Drawing = Drawing;

User.init(sequelize);
Post.init(sequelize);
Comment.init(sequelize);
Room.init(sequelize);
Question.init(sequelize);
Drawing.init(sequelize);

User.associate(db);
Post.associate(db);
Comment.associate(db);
Room.associate(db);
Question.associate(db);
Drawing.associate(db);

module.exports = db;

