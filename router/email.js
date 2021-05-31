var express = require('express')
var app = express()
var router = express.Router()
var mysql = require('mysql')
var path = require('path') //상대 경로를 쓰기 위해서


//DATABASE SETTING
var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : 'tjsal1593!',//비밀번호를 설정하지 않아 오류가 났었다.
	database : 'jsman'
})

connection.connect()

//ROUTER
router.post('/form', function(req, res){ //데이터를 어떻게 받을 것인가.. email/form이 된다.
	//get : req.param('email') post는 bodyparser라는 별도의 모듈 필요
	console.log(req.body.email)
	//res.send("<h1>hi ! " + req.body.email + "</h1>");
	res.render('email.ejs', {'email' : req.body.email})
})

router.post('/ajax', function(req, res){
	var email = req.body.email;
	var responseData = {};
	//여기서 db와 연동하여 확인 작업을 해야 한다.

	var query = connection.query('select name from user where email = "' + email + '"', function(err, rows){

		if(err) throw err;
		if(rows[0]){
			console.log(rows[0].name);
			responseData.result = "ok";
			responseData.name = rows[0].name;
		}
		else
		{
			console.log('none : ' + rows[0]);
			responseData.result = "none";
			responseData.name = "";
		}
		res.json(responseData);
	})
}) //이게 왔을

module.exports = router;
