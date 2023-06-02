const sequelize = require("sequelize");
require('dotenv').config()

const conexao = new sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect:"mysql",
        host:process.env.DB_HOST
    }
)

module.exports = { conexao }