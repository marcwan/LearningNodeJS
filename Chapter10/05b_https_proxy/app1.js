var express = require('express');

var one = express();
one.use(express.logger('dev'));
one.get("/", function(req, res){
    console.log(req);
    res.send("\nWhat part of 'highly classified' do you not understand?!!\n")
});

one.listen(8081);
