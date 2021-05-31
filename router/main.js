var express = require('express')
var app = express()
var router = express.Router()
var path = require('path') //상대 경로를 쓰기 위해서

//rogin이 될 때만 접근이 가능하게 하도록

router.get('/', function(req, res){ //루트가 main 일 때
	//res.send("<h1>hi friend!!!</h1>");
	console.log('main is loaded', req.user)
	var id = req.user;
	if(!id) res.render('login.ejs');
	//res.sendFile(path.join(__dirname,  "../public/main.html")) //절대경로를 다 써줘야 한다
	//URL routing 처리
	res.render('main.ejs', {id : id});
})

module.exports = router; //라우터가 export 됨으로써 다른 파일에서 쓸 수 있게된다.
