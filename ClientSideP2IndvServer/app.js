const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const app = express();
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true); //collection.ensureIndex deprication warning


mongoose.connect('mongodb://localhost/deliverydb', {useNewUrlParser: true}); //URL string parser is deprecated, using new one.
console.log("Successfully connected to MongoDB")

app.all('*', function(req, res, next){
    next();
});

app.use(cors());

app.use(bodyParser.json());
routes(app);

module.exports = app;