
var express = require('express');

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

master_app.use(express.logger('dev'));
master_app.use(express.vhost('app1', one))
master_app.use(express.vhost('app2', two));
master_app.use(express.vhost('app3', three));

master_app.listen(8080);
console.log('Listening on 8080 for three different hosts');
