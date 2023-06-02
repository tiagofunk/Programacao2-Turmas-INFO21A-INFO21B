const sequelize = require("sequelize");
const banco = require("./banco")

var pessoa = banco.conexao.define(
    "pessoa",
    {
        id:{
            type:sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement:true
        },
        nome:{
            type:sequelize.STRING,
            allowNull:false
        },
        idade:{
            type:sequelize.INTEGER.UNSIGNED,
            allowNull:false
        }
    }
)

module.exports = {pessoa}