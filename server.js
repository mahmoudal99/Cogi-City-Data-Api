const Express = require("express");
const BodyParser = require("body-parser");
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
var database, collection;
const password = "mahmoud808";

const cityRouter = require('./cityRouter');

const uri = "mongodb+srv://Cogi:" + password + "@city-data-db-3bqg0.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "city-data-db";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });

app.use('/cities', cityRouter);





