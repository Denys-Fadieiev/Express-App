// Розробити серверний застосунок, що обробляє http-запити на
// - отримання всього списку завдань,
// - створення однієї задачі,

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

const tasksDB = [
  {
    id: uuidv4(),
    body: 'Вивчити express',
    date: format(new Date(), 'Y-MM-dd'),
    isDone: false,
  },
  {
    id: uuidv4(),
    body: 'зробити дз',
    date: format(new Date(), 'Y-MM-dd'),
    isDone: false,
  },
];

class TasksDB {
  constructor (arr) {
    this.tasks = [...arr];
  }

  createTask (newTask) {
    this.tasks.push({...newTask, id: uuidv4(), isDone: false});
    return this.tasks[this.tasks.length-1];
  }

  getTasks () {
    return [...this.tasks];
  }
};

const tasksDbInstance = new TasksDB(tasksDB);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('app');
});

app.get('/tasks', (req, res) => {
  const tasks = tasksDbInstance.getTasks();
  res.status(200).send(tasks);
});

app.post('tasks', (req, res) => {
  const createdTask = tasksDB.createTask(req.body);
  res.status(201).send(createdTask);
});

module.exports = app;