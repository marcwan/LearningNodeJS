
var express = require('express');

var app = express()
    .use(express.logger('dev'))
    .use(express.cookieParser())
    .use(function(req, res){
        res.cookie("pet", "Zimbu the Monkey",
                   { expires: new Date(Date.now() + 86400000) });
        res.end(JSON.stringify(req.query) + "\n");
    })
    .listen(8080);


