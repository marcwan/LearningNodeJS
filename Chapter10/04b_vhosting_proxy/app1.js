
var express = require('express');

var one = express();
one.use(express.logger('dev'));
one.get("/", function(req, res){
    res.send("This is app one!")
});

one.listen(8081);
