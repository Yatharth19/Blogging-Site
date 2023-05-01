require('dotenv').config();
const express = require('express');
const db = require('./db/db');
const bodyParser = require('body-parser')

const app = express();
const routes = require('./routes/route');

// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));    //for receiving through HTML forms
app.use(bodyParser.json()); //for postman
app.use('/', routes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})