const express  = require('express');
const db  = require('./config/database');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const port = 8000;
const app = express();
const passport = require('passport');
const passportStratergy = require('./config/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


app.use(router);

app.listen(port , (err)=>{
    if(err){
        console.log("error",err);
    }
    else{
        console.log("server is running on port" , +port);
    }
})