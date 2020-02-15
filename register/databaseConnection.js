const mongoose = require('mongoose');

let options = {useNewUrlParser: true};

mongoose.connect(process.env.DB, options)
    .then(() => console.log('Connected to MongoDb...'));


module.exports.closeMongoDBConnection = function () {
    return mongoose.disconnect();
};
