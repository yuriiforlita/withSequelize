const sq = require('./db')
const Sequelize = require("sequelize");

const User = sq.define("user", {
    name: {
      type: Sequelize.STRING
    }
  });
  
module.exports = User;