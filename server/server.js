// Start with loading the .env file data so that we can use it everywhere
// in our server
require("dotenv").config();

// import express and other libraries
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

// configure express app server
app.use(cors({
    // adding the ability to use credentials with cookies
    credentials: true,
}));
app.use(express.json(), express.urlencoded({ extended: true }));
// configuring the server to accept and update cookies
app.use(cookieParser());

// configure mongoose to connect
require('./config/mongoose.config');
// add routes to listen
require('./routes/favrestaurant.routes')(app);
require('./routes/user.routes')(app);


// start the server listening
const port = process.env.MY_PORT;
app.listen(process.env.MY_PORT, ()=>{console.log(`Listening on port: ${process.env.MY_PORT}`)});