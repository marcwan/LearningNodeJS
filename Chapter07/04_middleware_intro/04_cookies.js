
var express = require('express'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser');

var app = express()
    .use(morgan('dev'))
    .use(cookieParser())
    .use(function(req, res){
        res.cookie("pet", "Zimbu the Monkey",
                   { expires: new Date(Date.now() + 86400000) });
        res.end(JSON.stringify(req.query) + "\n");
    })
    .listen(8080);


