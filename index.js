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

app.post('/todos/create', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).json(todo);
});

app.get('/todos/get-all', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({ todos: todos });
});

app.get('/todos/get-by-id/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.status(200).json({ todo: todo });
});

app.put('/todos/mark-completed/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = true;
  await todo.save();
  res.status(200).json({ message: `Todo with id: ${req.params.id} completed` });
});

app.put('/todos/update/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.title = req.body.newTitle;
  await todo.save();
  res.status(200).json({ message: `Todo with id: ${req.params.id} updated` });
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Todo with id: ${req.params.id} deleted` });
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
})