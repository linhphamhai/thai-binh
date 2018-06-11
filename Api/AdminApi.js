var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var CONSTANT = require('./../config/Constants');
var postDao = require('./../dao/PostDao')
var actionDao = require('./../dao/ActionDao');


router.post('/admin-api/post', function (req, res) {
    var newPost = req.body;
    var currentDate = new Date();
    newPost.timestamp = currentDate.getTime();
    var arrThu = ['Chủ nhật', "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    var showTime = arrThu[currentDate.getDay()] + ', Ngày ' + currentDate.getDate() + ' tháng '
        + (currentDate.getMonth() + 1) + ' năm ' + currentDate.getFullYear();
    newPost.showTime = showTime;
    newPost.state = true;
    MongoClient.connect(CONSTANT.DB_URL, function (err, db) {
        if (err) throw err;
        var dbo = db.db("information_tb");
        dbo.collection("posts").insertOne(newPost, function (err, result) {
            db.close();
            if (err) {
                throw err;
                res.status(404).json({ result: false });
            }
            res.status(200).json({ result: true });
        });
    });
});

router.get('/admin-api/get-post-by-page', function (req, res) {
    var page = req.query.page;
    MongoClient.connect(CONSTANT.DB_URL, function (err, db) {
        if (err) throw err;
        var dbo = db.db("information_tb");
        dbo.collection("posts").find({}).skip((page - 1) * 5).limit(5).sort({ timestamp: -1 }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.json(result);
        });
    });
});

router.delete('/admin-api/post-delete', function (req, res) {
    var postId = req.body.postId;
    console.log(postId);
    postDao.getPostById(postId, function (post) {
        var newPost = { ...post };
        newPost.state = false;
        postDao.deletePost(newPost, function (result) {
            if (result != null) {
                res.json({ result: true });
            } else {
                res.json({ result: false });
            }
        })
    });
});

router.get('/admin-api/get-actions-by-page/:page', function (req, res) {
    var page = req.params.page;
    actionDao.getActionByPage(page, function (result) {
        res.json(result);
    })
});

router.post('/admin-api/action', function (req, res) {
    var newAction = req.body;
    actionDao.addNewAction(newAction, function (result) {
        if (result) {
            return res.json({ result: true });
        }
        res.json({ result: false });
    })
});

router.get('/admin-api/actions', function (req, res) {
    actionDao.getActions(function (result) {
        if (result) {
            return res.json(result);
        }
        res.json(null);
    })
});

module.exports = router;