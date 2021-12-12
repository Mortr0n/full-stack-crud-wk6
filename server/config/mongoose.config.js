const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurants', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established connection to the database'))
    .catch(err => console.log('Something has gone wrong with connecting to the database', err));