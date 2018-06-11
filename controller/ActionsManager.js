var express = require('express');
var router = express.Router();
var actionDao = require('./../dao/ActionDao')
router.get('/admin/actions-manager', function (req, res) {
    actionDao.getCountOfAction(function (count) {
        if (count) {
            var page = parseInt(count / 5) + 1;
            var pages = [];
            for (var i = 1; i <= page; i++) {
                pages.push(i);
            }
            console.log(pages)
            return res.render('admin/ActionsManager', {pages : pages});
        }
        return res.render('admin/ActionsManager', {pages : []});
    })
    
});

router.get('/admin/actions-manager/create', function (req, res) {
    res.render('admin/NewAction');
});

module.exports = router;