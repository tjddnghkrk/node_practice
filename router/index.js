var express = require('express')
var app = express()
var router = express.Router()
var mysql = require('mysql')
var path = require('path') //상대 경로를 쓰기 위해서

var main = require('./main')
var email = require('./email')
var join = require('./join') //가야할 곳
var login = require('./login')
var logout = require('./logout')


//root routing
router.get('/', function(req, res){ //main 쳐도 사이트 나오게
	//res.send("<h1>hi friend!!!</h1>");
	res.render('login.ejs'); //절대경로를 다 써줘야 한다
	//URL routing 처리
})

router.use('/main', main) //main.js의 라우터를 불러준다.
router.use('/email', email)
router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)

module.exports = router;
