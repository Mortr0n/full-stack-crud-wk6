const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Established connection to ${process.env.DB_NAME}`))
    .catch(err => console.log('Something has gone wrong with connecting to the database', err));