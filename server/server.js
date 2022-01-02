// Start with loading the .env file data so that we can use it everywhere
// in our server
require("dotenv").config();

// import express and other libraries
const express = require('express');
const cors = require('cors');
const app = express();

// configure express app server
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));
// configure mongoose to connect
require('./config/mongoose.config');
// add routes to listen
require('./routes/favrestaurant.routes')(app);


// start the server listening
const port = process.env.MY_PORT;
app.listen(process.env.MY_PORT, ()=>{console.log(`Listening on port: ${process.env.MY_PORT}`)});