var express = require('express');
var app = express();

app.use(express.logger('dev'))
     // move this to AFTER the next use() and see what happens!
    .use(function(req, res){
        res.end('hello world\n');
    })
    .use(express.responseTime())
    .listen(8080);
