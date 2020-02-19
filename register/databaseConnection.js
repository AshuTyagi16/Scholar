const mongoose = require('mongoose');

let options = {useNewUrlParser: true};

mongoose.connect('mongodb://wuser:123scholar@ds039441.mlab.com:39441/scholar', options)
    .then(() => console.log('Connected to MongoDb...'));


module.exports.closeMongoDBConnection = function () {
    return mongoose.disconnect();
};
