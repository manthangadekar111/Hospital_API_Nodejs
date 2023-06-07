const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/hospitalDB');
const db = mongoose.connection;
db.error(
    'error',
    console.error.bind(console , "error occured!")
);
db.once('open',()=>{
    console.log('successfully connected with mongoose');
});


module.exports = db;