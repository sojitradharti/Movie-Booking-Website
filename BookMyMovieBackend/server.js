const express = require('express');
const bodyParser = require('body-parser');
cors = require('cors');
//require express framework
function main () {
    var express = require('express'),
        app = express(),
        //to execute on port 3000
        port = process.env.PORT || 3000,

        mongoose = require('mongoose'),
        bodyParser = require('body-parser');

// mongoose instance connection url connection
    mongoose.Promise = global.Promise;
//connecting to DB using mongoose
//Database with name bookmymovie-db will create automatically
    mongoose.connect('mongodb+srv://thesparklers:The_Sparklers@1@bookmymoviecluster-9bnce.mongodb.net/bookmymovie-db?retryWrites=true',{
        useMongoClient: true, useNewUrlParser: true, useCreateIndex: true
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

//importing contact routes
app.use(cors());
    var routes = require('./api/routes/Routes');
    routes(app); //register the route
    app.listen(port);
    console.log('API server started on: ' + port);
}

main();
