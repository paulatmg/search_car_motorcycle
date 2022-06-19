var express = require('express');
var router = express.Router();
var functions = require('../functions/mongoFunctions');
var moment = require('moment');
const axios = require('axios').default;



router.get('/', function (req, res, next) {


    functions.handlerFunction({
        make: req.query.make,  
        newmake: req.query.newmake,  
        newmodel: req.query.newmodel,  
        newyear: req.query.newyear,  
        newkm: req.query.newkm,   
    })


      .then((response) => res.send(response))
      .catch((error) => res.send(error.message));
  });
  
  module.exports = router;