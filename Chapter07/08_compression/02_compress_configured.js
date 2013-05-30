
var express = require('express');
var app = express();

app.use(express.logger('dev'));
app.configure('production', function () {
    app.use(express.compress());
});

app.get('/', function(req, res){
    res.send('hello world this should be compressed\n');
});

app.listen(8080);
