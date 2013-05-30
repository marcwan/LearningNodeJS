
var express = require('express');

var two = express();
two.use(express.logger('dev'));
two.get("/", function(req, res){
    res.send("This is app two!")
});

two.listen(8082);
