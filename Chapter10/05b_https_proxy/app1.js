var express = require('express'),
    morgan = require('morgan');

var one = express();
one.use(morgan('dev'));
one.get("/", function(req, res){
    console.log(req);
    res.send("\nWhat part of 'highly classified' do you not understand?!!\n")
});

one.listen(8081);
