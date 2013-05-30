
// to test: 
// curl -i -H "Expect:" --form 'album_cover=@oranges.jpg' --form albumid=italy2012 http://localhost:8080

var express = require('express');
var app = express()
    .use(express.logger('dev'))
    .use(express.bodyParser())
    .use(function(req, res){
        if (!req.files || !req.files.album_cover) {
            res.end("Hunh. Did you send a file?");
        } else {
            console.log(req.files);
            res.end("You have asked to set the album cover for "
                    + req.body.albumid
                    + " to '" + req.files.album_cover.name + "'\n");
        }
    })
    .listen(8080);

