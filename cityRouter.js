const express = require('express');
const router = express.Router();

const City = require('./CitySchema');

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

module.exports = router;
