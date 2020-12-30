var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// 測試畫面
router.get('/test', function(req, res) {
    res.render('test', { title: 'login' });
});

// 測試登入畫面
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

module.exports = router;