require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 3001 || process.env.PORT

connectDB();

app.use(express.json());
app.use(express.static('public'));

//Templateing Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`);
});
