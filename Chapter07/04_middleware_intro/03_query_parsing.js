
/**
 * Call this server with some query params to see what happens, i.e.
 * curl 'localhost:8080/blarg?cat=meow&dog=woof'
 */
var express = require('express');

var app = express()
    .use(express.logger('dev'))
    .use(express.responseTime())
    .use(express.query())
    .use(function(req, res){
        res.end(JSON.stringify(req.query) + "\n");
    })
    .listen(8080);
