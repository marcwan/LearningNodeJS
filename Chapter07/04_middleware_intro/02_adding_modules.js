var express = require('express'),
    morgan = require('morgan'),
    responseTime = require('response-time');

var app = express();

app.use(morgan('dev'))
     // move this to AFTER the next use() and see what happens!
    .use(function(req, res){
        res.end('hello world\n');
    })
    .use(responseTime())
    .listen(8080);
