var express = require('express')
var app = express()
var router = express.Router()
var mysql = require('mysql')
var path = require('path') //상대 경로를 쓰기 위해서

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;


//DATABASE SETTING
var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : 'tjsal1593!',//비밀번호를 설정하지 않아 오류가 났었다.
	database : 'jsman'
})

connection.connect()

//그냥 들어갈 때
router.get('/', function(req, res){
	var msg;
	var errMsg = req.flash('error');
	if(errMsg) msg = errMsg;
	//console.log(msg);
	res.render('join.ejs', {'message' : msg});
})

passport.serializeUser(function(user,done){ //세션에 저장
	console.log('passport session save : ', user.id);
	done(null, user.id);
})

passport.deserializeUser(function(id, done){ //세션에서 불러오기
	console.log('passport session get id', id);
	done(null, id);
})

passport.use('local-join', new LocalStrategy({
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true //ture면 (req, email, password, done), false면 (email, password, done)
}, function(req, email, password, done){ //done은 동기로 바꿔줌
		var query = connection.query('select * from user where email=?', [email], function(err,rows){
			if(err) return done(err); //처리된 에러가 있다
			if(rows.length) //처리된 결과기 있을 때
			{
				console.log('existed user');
				return done(null, false, {message: 'your email is already used'}) //실패할 떄 false를 반환해라 //임의 에러처리
			}else{
				var sql = {email : email, pw : password};
				var query = connection.query('insert into user set ?', sql, function(err, rows){
					if(err) throw err
					return done(null, {'email' : email, 'id' : rows.insertId}) //고유한 식별
				})
			}
		});
}));

//done : (무조건 실패하는 경우 처리, 성공할 경우 return 값, 임의로 실패를 만들고 싶은 경우)

router.post('/', passport.authenticate('local-join',{
	successRedirect : '/main',
	failureRedirect : '/join',
	failureFlash : true}
))

/* 전통적인 방법
//form 입력 받을 때
router.post('/', function(req, res){
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var passwd = body.password;

  var query = connection.query('insert into user (email, name, pw) values ("' + email + '", "' + name + '", "' + passwd + '")', function(err, rows){
    if(err) {throw err;}
    else
      res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId});
  })
})
*/
module.exports = router;
