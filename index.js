const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Brendon:pass123@cluster0.zvg9ytk.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

const app = express();

app.use(bodyParser.json);

app.get('/todos', (req, res) => {
  res.json({ todos: 'Todos go here' });
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
})