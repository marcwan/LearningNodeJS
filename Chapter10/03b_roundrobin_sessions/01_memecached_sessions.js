var express = require('express');

// pass the express object so it can inherit from MemoryStore
var MemcachedStore = require('connect-memcached')(express);
var mcds = new MemcachedStore({ hosts: "localhost:11211" });

var app = express()
    .use(express.logger('dev'))
    .use(express.cookieParser())
    .use(express.session({ secret: "cat on keyboard",
                           cookie: { maxAge: 1800000 },
                           store: mcds}))
    .use(function(req, res){
        var x = req.session.last_access;
        req.session.last_access = new Date();
        res.end("You last asked for this page at: " + x);
    })
    .listen(8080);
