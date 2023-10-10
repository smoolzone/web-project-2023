const express = require('express');
var chalk = require('chalk');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users.routes.js');
const cardsRouter = require('./routes/cards.routes.js');

const app = express();

app.get("/", (req, res)=>{
    console.log(chalk.blue('Hello world!'));
    res.send("Hello world");
});

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

const port = process.env.PORT || 8181;

app.listen(port, ()=>{
    console.log(chalk.blue("Example app listening on port 3000!"));
});

mongoose
  .connect('mongodb://127.0.0.1:27017/test_alex')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  });