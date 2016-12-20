var express = require('express'),
    morgan = require('morgan');
var app = express();

app.use(morgan('dev'));

app.use(function (req, res) {
    res.end("Hello World");
});

app.listen(8080);
