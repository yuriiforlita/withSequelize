const sq = require('./db')
const Sequelize = require("sequelize");

const Task = sq.define("task", {
    text: {
      type: Sequelize.STRING
    }
  });
  
module.exports = Task;