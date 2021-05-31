var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')
var flash = require('connect-flash')//오류 메시지 쉽게 전달

app.listen(3000, function(){
	console.log("start !!! express server on port 3000");
});

//미들웨어
app.use(express.static('public')) //public 아래에 있는 파일들을 static으로 해서 잘 불러오도록 처리해줘라
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))//json과 인코딩된 url이 올 때, 바디 파서를 쓰겠다.
app.set('view engine', 'ejs') //ejs 라이브러리. 특정 원하는 Html을 반환해준다
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session()) //초기화
app.use(flash())//에러 메시지 쉽게 전달


app.use(router)// 얘도 분류할수 있지만 루트라 안함
