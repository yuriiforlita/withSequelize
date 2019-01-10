const sq = require('./db')
const Sequelize = require("sequelize");
const Task = require('./Task');
const Priority = require('./Priority');
const User = require('./User');

// one-to-many relation
User.hasMany(Task);

// one-to-one relation
Task.belongsTo(User);
Task.belongsTo(Priority);

// create all models
const whenDbCreated =sq.sync({ force: true }).then(() => {
  // tables are created
  console.log("created all the tables...");

  return Promise.all([
    // Populate priorities
    Priority.create({ text: "Minor" }),
    Priority.create({ text: "Major" }),
    Priority.create({ text: "Urgent" }),

    // create a user
    User.create({
      name: "Yurii"
    }),
    User.create({
      name: "Antony"
    }),
   
    // create a task for a user
    Task.create({
      text: "Learn Web Development!",
      userId: 1,
      priorityId: 3
    })
  ])
});
module.exports = whenDbCreated;

