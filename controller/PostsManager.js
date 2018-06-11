var express = require('express');
var router = express.Router();
var CONSTANT = require('./../config/Constants');
var MongoClient = require('mongodb').MongoClient;


router.get('/admin/posts-manager', function (req, res) {
    try {
        MongoClient.connect(CONSTANT.DB_URL, function (err, db) {
            if (err) throw err;
            var dbo = db.db("information_tb");
            dbo.collection("posts").count(function (err, result) {
                if (err) {
                    return res.render("admin/PostsManager", { page: 0})
                } else {
                    var page = parseInt(result / 5) + 1;
                    var pages = [];
                    for( var i = 1; i <= page; i ++){
                        pages.push(i);
                    }
                    return res.render("admin/PostsManager", { pages: pages})
                }
            })
        });
    } catch (error) {
        return res.render("admin/PostsManager ", { page: 0})
    }
});

router.get('/admin/posts-manager/create', function (req, res) {
    res.render('admin/NewPost');
});

module.exports = router;