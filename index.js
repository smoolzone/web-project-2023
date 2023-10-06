const express = require('express');
var chalk = require('chalk');
const usersRouter = require('./routes/users.routes.js');
const cardsRouter = require('./routes/cards.routes.js');

const app = express();

app.get("/", (req, res)=>{
    console.log(chalk.blue('Hello world!'));
    res.send("Hello world")
});

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(chalk.blue("Example app listening on port 3000!"));
});