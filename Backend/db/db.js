require('dotenv').config();
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