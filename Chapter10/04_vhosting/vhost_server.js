
var express = require('express'),
    evh = require('express-vhost'),
    morgan = require('morgan');

var one = express();
one.get("/", function(req, res){
    res.send("This is app one!")
});


// App two
var two = express();
two.get("/", function(req, res){
    res.send("This is app two!")
});

// App three
var three = express();
three.get("/", function(req, res){
    res.send("This is app three!")
});


// controlling app
var master_app = express();

master_app.use(morgan('dev'));
master_app.use(evh.vhost('app1', one))
master_app.use(evh.vhost('app2', two));
master_app.use(evh.vhost('app3', three));

master_app.listen(8080);
console.log('Listening on 8080 for three different hosts');
