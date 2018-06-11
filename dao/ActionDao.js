var MongoClient = require('mongodb').MongoClient;
var CONSTANT = require('./../config/Constants');
var ObjectId = require('mongodb').ObjectID;

var actionDao = {
    
    getActionByPage: function (page, callback) {
        try {
            MongoClient.connect(CONSTANT.DB_URL, function (err, db) {
                var dbo = db.db("information_tb");
                dbo.collection("actions").find({}).skip((page - 1) * 5).limit(5).sort({ timestamp: -1 }).toArray(function (err, result) {
                    callback(result);
                });
            });
        } catch (error) {
            callback(null);
        }
    },

    getActions: function ( callback) {
        try {
            MongoClient.connect(CONSTANT.DB_URL, function (err, db) {
                var dbo = db.db("information_tb");
                dbo.collection("actions").find({}).sort({ name: -1 }).toArray(function (err, result) {
                    callback(result);
                });
            });
        } catch (error) {
            callback(null);
        }
    },

    addNewAction: function (newAction, callback) {
        try {
            MongoClient.connect(CONSTANT.DB_URL, function (err, db) {
                if (err) throw err;
                var dbo = db.db("information_tb");
                dbo.collection("actions").insertOne(newAction, function (err, result) {
                    db.close();
                    return callback(true);
                });
            });
        } catch (error) {
            return callback(null);
        }
    },

    getCountOfAction : function(callback){
        try {
            MongoClient.connect(CONSTANT.DB_URL, function (err, db) {
                if (err) throw err;
                var dbo = db.db("information_tb");
                dbo.collection("actions").count( function (err, result) {
                    db.close();
                    console.log(result)
                    return callback(result);
                });
            });
        } catch (error) {
            return callback(null);
        }
    }

}
module.exports = actionDao;