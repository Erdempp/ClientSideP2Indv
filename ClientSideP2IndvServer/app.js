const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const app = express();

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true); //collection.ensureIndex deprication warning

if(process.env.NODE_ENV == 'testCloud' || process.env.NODE_ENV == 'production') {
    mongoose.connect('mongodb+srv://dbUser:dbUserPassword@restaurantdb-mtjqd.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
    console.log("Successfully connected to online MongoDB");
}
else if(process.env.NODE_ENV == 'test'){
    mongoose.connect('mongodb://localhost/deliverydb', {useNewUrlParser: true});
    console.log("Successfully connected to local MongoDB");
}

app.all('*', function(req, res, next){
    next();
});

app.use(bodyParser.json());
routes(app);

module.exports = app;