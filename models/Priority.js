const sq = require('./db');
const Sequelize = require('sequelize');

const Priority = sq.define("priority", {
  text: {
    type: Sequelize.STRING
  }
});

module.exports = Priority;
