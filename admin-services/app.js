
var express = require("express");

var cors = require('cors');
var app = express();

app.use(cors());

app.use(function (req, res, next) {
    console.log('A new request recieved at : ' +  Date.now());
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const dbConfig = require('./config/db.config.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// var notification = require('./routers/notification.router.js');

// app.use('/notification', notification);

app.listen(3100, () => {
    console.log("Server running on Port 3100");
});

app.get("/users", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});
// http://localhost:3100/users

