
var express = require('express'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');


var app = express()
    .use(morgan('dev'))
    .use(cookieParser())
    .use(session({ secret: "blargleipoajsdfoiajf",
                   resave: false,
                   saveUninitialized: true,
                   cookie: { maxAge: 1800000 } }))
    .use(function(req, res){
        var x = req.session.last_access;
        req.session.last_access = new Date();
        res.end("You last asked for this page at: " + x);
    })
    .listen(8080);


