const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use('/v1', require('./routes/v1'));
app.use('/', require('./routes/v1'));

process.on('unhandledRejection', (ex) => {
    throw ex;
});
process.on('uncaughtException', function (err) {
    console.log(err);
});

require('./register/databaseConnection');

app.get('/home', (req, res) => {
    res.status(200).send('HOME PAGE');
});

app.listen(5000, () => {
    console.log('App is listening on port 5000')
});