const express = require('express');
require('dotenv').config();
import mongoose from "mongoose";

const dbUrl = process.env.MONDGODB_URL;

mongoose.connect(`${dbUrl}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to database'));

const app = express();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});