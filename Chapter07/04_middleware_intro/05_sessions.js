
var express = require('express');
var MemStore = express.session.MemoryStore;

var app = express()
    .use(express.logger('dev'))
    .use(express.cookieParser())
    .use(express.session({ secret: "cat on keyboard",
                           cookie: { maxAge: 1800000 },
                           store: new MemStore()}))
    .use(function(req, res){
        var x = req.session.last_access;
        req.session.last_access = new Date();
        res.end("You last asked for this page at: " + x);
    })
    .listen(8080);


