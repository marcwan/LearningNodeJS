
var express = require('express');

var three = express();
three.use(express.logger('dev'));
three.get("/", function(req, res){
    res.send("This is app three!")
});

three.listen(8083);
