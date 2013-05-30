var express = require('express');
var app = express();

app.use(express.logger());
app.use(express.methodOverride());
app.use(function (req, res) {
    res.end("You send a request with method: " + req.method);
});

app.listen(8080);
