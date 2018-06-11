var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var CONSTANT = require('./../config/Constants');


router.get('/page-api/get-slide-image', function(req, res){
    MongoClient.connect(CONSTANT.DB_URL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("information_tb");
        dbo.collection("slider").find({}).toArray(function(err, result) {
          if (err) throw err;
          db.close();
          res.json(result);
        });
      });
});

router.get('/page-api/get-newest', function(req, res){
  MongoClient.connect(CONSTANT.DB_URL, function(err, db) {
      if (err) throw err;
      var dbo = db.db("information_tb");
      dbo.collection("posts").find({}).limit(6).sort({timestamp : -1}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        res.json(result);
      });
    });
});

router.get('/page-api/get-count-of-page', function(req, res){
  MongoClient.connect(CONSTANT.DB_URL, function(err, db) {
      if (err) throw err;
      var dbo = db.db("information_tb");
      dbo.collection("slider").count(function(err, result){
        if(err) {
          res.status(404).json({page : 0});
        }else{
          res.status(200).json({page : result});
        }
        res.json({});
      })
    });
});
module.exports = router;