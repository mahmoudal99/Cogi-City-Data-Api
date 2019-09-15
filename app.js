const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db_password = 'mahmoud808';

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Cogi:'+db_password+'@city-data-db-3bqg0.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const citiesRouter = require('./api/routes/cities');

app.use(morgan('dev'));
app.use('/cities', citiesRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Auhorization"
  );

  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Error handling
app.use((req, res, next) =>{
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((req, res, next) =>{
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  });
});

module.exports = app;
