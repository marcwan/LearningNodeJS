var express = require('express'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    session = require('express-session');

var port_number = 8080;
if (process.argv.length == 3) {
    port_number = process.argv[2];
}


// pass the express object so it can inherit from MemoryStore
var MemcachedStore = require('connect-memcached')(session);
var mcds = new MemcachedStore({ hosts: "localhost:11211" });

var app = express()
    .use(morgan('dev'))
    .use(cookieParser())
    .use(session({ secret: "cat on keyboard",
                   cookie: { maxAge: 1800000 },
                   resave: false,
                   saveUninitialized: true,
                   store: mcds}))
    .use(function(req, res){
        var x = req.session.last_access;
        req.session.last_access = new Date();
        res.end("You last asked for this page at: " + x);
    })
    .listen(port_number);
