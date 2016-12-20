// to test: 
// curl -d '{"album":{"new_name":"italy2011"}}' -H "Content-Type: application/json" localhost:8080

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var app = express()
    .use(morgan('dev'))
     // move these to AFTER the next use() and see what happens!

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())
    .use(function(req, res){
        console.log(req.body);
        res.end('want to update album name to '
                + req.body.album.new_name + "\n");
    })
    .listen(8080);

