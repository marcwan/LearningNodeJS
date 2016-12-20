
/**
 * Call this server with some query params to see what happens, i.e.
 * curl 'localhost:8080/blarg?cat=meow&dog=woof'
 */
var express = require('express'),
    morgan = require('morgan'),
    responseTime = require('response-time');


var app = express()
    .use(morgan('dev'))
    .use(responseTime())
    .use(function(req, res){
        res.end(JSON.stringify(req.query) + "\n");
    })
    .listen(8080);
