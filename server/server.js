const express = require('express');
const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
require('./config/mongoose.config');
require('./routes/favrestaurant.routes')(app);



const port = 8000;
app.listen(port, ()=>{console.log(`Listening on port: ${port}`)});