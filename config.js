const Sequelize = require("Sequelize");
const db = {};

const connection = new Sequelize("todolist","root","12345",{
    host:"localhost",
    dialect:"mysql",
    operatorsAliases: false,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
})
module.exports = connection;