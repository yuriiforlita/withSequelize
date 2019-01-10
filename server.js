const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const dbConnect = require('./models/db');
const whenDbCreated = require('./models/whenDbCreated');
const Task = require('./models/Task')
const User = require('./models/User')
const Priority = require('./models/Priority')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

whenDbCreated.then(() => {
  User.findAll({
    raw: true
  }).then(users => {
    console.log("USER_ID: ", users);
  });
});


app.get('/api/store/',(req,res)=>{
  console.log(req.params.userId)
  whenDbCreated.then(() => {
    Task.findOne({
      where: {
        id: 1
      },
      include: [User, Priority]
    }).then(task => {
      let store = {
      users: [
        {
          name: task.user.name,
          id: task.user.id,
          doneTasks: 0,
          tasks: [
            {
              task: task.text,
              crossed: false,
              id: task.id,
              date: `13 / 12 / 2018`,
              time: `14:32:23`,
              prioritytask: 0,
              priorityvalue: task.priority.text,
              changevalue: false,
              doneTasksLength: 0
            }
          ]
        }
      ],
      currentTabId: task.user.id,
      taskValue: "",
      userValue: ""
    };
      res.json(store)
    })
    })
  })

  app.get('/api/store/:userId',(req,res)=>{
    console.log(req.params.userId)
    whenDbCreated.then(() => {
      Task.findOne({
        where: {
          id: req.params.id
        },
        include: [User, Priority]
      }).then(task => {
        let store = {
        users: [
          {
            name: task.user.name,
            id: task.user.id,
            doneTasks: 0,
            tasks: [
              {
                task: task.text,
                crossed: false,
                id: task.id,
                date: `13 / 12 / 2018`,
                time: `14:32:23`,
                prioritytask: 0,
                priorityvalue: task.priority.text,
                changevalue: false,
                doneTasksLength: 0
              }
            ]
          }
        ],
        currentTabId: task.user.id,
        taskValue: "",
        userValue: ""
      };
        res.json(store)
      })
      })
    })

    app.get('/api/users/',(req,res)=>{ 
      whenDbCreated.then(() => {
        User.findAll({
          raw: true
        }).then(users => {
          res.json(users)
        });
      });
    })

app.put('/api/:currentActiveId',(req,res)=>{
  store = { ...store, currentTabId: req.params.currentActiveId };
  if (store.currentTabId === req.params.currentActiveId) {
    return res.send(res.status);
  }
  return res.send(res.status);
})
app.delete('/api/tasks/:taskID',(req,res)=>{
  whenDbCreated.then(() => {
    Task.destroy({
      where:{
        id:req.params.taskID
      }
    }).then(status => res.send(status))
    .catch(err=> res.json(err))
  })
})
app.post('/api/store/users',(req,res)=>{
  if(!req.body.name){
    res.status(400)
    res.json({
      error:'something BAD'
    })
  }
  else{
    whenDbCreated.then(() => {
    User.create({
      name: req.body.name
    }).then(data => res.send(status))
    .catch(err=> res.json(err))
  })
  } 
})
app.post('/api/tasks/:userID',(req,res)=>{
  if(!req.body.allState){
    res.status(400)
    res.json({
      error:'something BAD'
    })
  }
  else{
    whenDbCreated.then(() => {
    Task.create({
      text: req.body.allState,
      userId: req.body.activeTab,
      priorityId: 3
    }).then(data => res.send(status))
    .catch(err=> res.json(err))
  })
  } 
})
app.delete('/api/store/:id',(req,res)=>{
  whenDbCreated.then(() => {
  User.destroy({
    where:{
      id:req.params.id
    },
    include: [User, Priority]
  }).then(data => res.send(status))
  .catch(err=> res.json(err))
})
})

app.put('/api/:userId/:id',(req,res)=>{
    console.log(req.body)
      store = {
    ...store,
    users: store.users.map(user => {
      user.tasks = user.tasks.map(task => {
        if (req.params.id === task.id) {
          return req.body
        } else {
          return task;
        }
      });
      return user;
    })
  };
  
  return res.send(res.status);
})
dbConnect.authenticate()
  .then(function () {
      console.log("CONNECTED! ");
  })
  .catch(function (err) {
      console.log("SOMETHING DONE GOOFED");
  })


const port = 9000;
app.listen(port,()=> console.log("started"));