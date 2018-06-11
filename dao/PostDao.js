var MongoClient = require('mongodb').MongoClient;
var CONSTANT = require('./../config/Constants');
var ObjectId = require('mongodb').ObjectID;
var postDao = {
    getPostById: function (id, callback) {
        try {
            MongoClient.connect(CONSTANT.DB_URL, function (err, db) {
                var dbo = db.db("information_tb");
                dbo.collection("posts").findOne(ObjectId(id), function (err, result) {
                    db.close();
                    callback(result);
                });
            });
        } catch (error) {
            callback(null);
        }

    },

    deletePost : function(newPost, callback) {
        console.log(newPost)
        try {
            MongoClient.connect(CONSTANT.DB_URL, function (err, db) {
                var dbo = db.db("information_tb");
                dbo.collection("posts").updateOne({timestamp : newPost.timestamp}, {$set : {state : false}},  function (err, result) {
                    db.close();
                    console.log(result);
                    callback(result);
                });
            });
        } catch (error) {
            callback(null);
        }
    },

    
}
module.exports = postDao;