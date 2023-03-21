const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const sequelize = require("./db.js");

const app = express();

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);

app.use(express.static('sources'));

app.listen(3000, async () => {
    await sequelize.authenticate();
    await sequelize.sync({alter: true});
    console.log('work on 30000');
})

