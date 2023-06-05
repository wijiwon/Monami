const dot = require('dotenv').config();

const config = {
    dev: {
        username : process.env.DATABASE_USERNAME,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_NAME,
        host : process.env.DATABASE_HOST,
        dialect : "mysql"
    }
}

module.exports = config;