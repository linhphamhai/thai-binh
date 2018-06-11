var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://root:admin@ds111420.mlab.com:11420/information_tb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("information_tb");
    dbo.collection("slider").find({}).limit(5).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });

