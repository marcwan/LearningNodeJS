// to test: 
// curl -d '{"album":{"new_name":"italy2011"}}' -H "Content-Type: application/json" localhost:8080

var express = require('express');
var app = express()
    .use(express.logger('dev'))
     // move this to AFTER the next use() and see what happens!
    .use(express.bodyParser())
    .use(function(req, res){
        console.log(req.body);
        res.end('want to update album name to '
                + req.body.album.new_name + "\n");
    })
    .listen(8080);

