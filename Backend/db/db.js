require('dotenv').config();
// const mysql = require('mysql2');

// const HOST = process.env.HOST || "localhost";
// const USERNAME = process.env.USERNAAM || "root";
// const PASSWORD = process.env.PASSWORD
// console.log(USERNAME);
// const con = mysql.createConnection({
//     host: HOST,
//     user: USERNAME,
//     password: PASSWORD
//   });

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });


// module.exports = con;

const mongoose = require('mongoose');


const mongoURL = process.env.MONGO_URI;
let _db = null;
const connectDB = mongoose.connect(mongoURL, 
  { useUnifiedTopology: true, useNewUrlParser: true }
  ).then(client => {
    console.log('Connection successful')
    _db = mongoose.connection;
  }).catch(err => {
    console.log(err);
  }) 


module.exports = _db;