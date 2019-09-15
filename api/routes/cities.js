const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
let cityData = fs.readFileSync('test1.json');

let cityData2 = fs.readFileSync('convertcsv.json');
let cities = JSON.parse(cityData2);
console.log(cityData2.length);

const City = require('../models/city');


router.get('/', (req, res, next) => {
  City.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      cosole.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:city', (req, res, next) => {
  City.findOne({city: req.params.city})
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      cosole.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  // const city = new City({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Lisbon"
  // });
  // city.save(jsonFile)
  //   .then(result => {
  //     console.log(result);
  //   })
  //   .catch(err => console.log(err));
  // res.status(201).json({
  //   message: "Handlig POST requests to /cities",
  //   createdCity: city
  // });
  City.insertMany(cities)
    .then(result =>{
    console.log(result);
  })
    .catch(err => {
      console.log(err)
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  City.findById(id).exec().then(doc => {
    console.log(doc);
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: 'No valid entry found for provided ID'})
    }

  })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err})
    });
});

module.exports = router;
