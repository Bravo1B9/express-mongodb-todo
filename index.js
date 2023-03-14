const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://Brendon:pass123@cluster0.zvg9ytk.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

const app = express();

app.use(bodyParser.json());

app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

app.get('/todos', async (req, res) => {
  res.json({ todos: 'Todos go here' });
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
})