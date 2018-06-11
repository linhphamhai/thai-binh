var express = require('express');
var app = express();
app.use(express.static("public"));
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', './views');
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jsonParser);
var PageApi = require('./Api/PageApi');
var AdminApi = require('./Api/AdminApi');
var PostsManager = require('./controller/PostsManager');
var ActionsManager = require('./controller/ActionsManager');
app.listen(3000, function () {
    console.log('Server started !');
});

app.get('/', function (req, res) {
    res.render('Home');
})


// Map for Api
app.use('/', PageApi);
app.use('/', AdminApi);

// Map for controller
app.use('/', PostsManager);
app.use('/', ActionsManager);