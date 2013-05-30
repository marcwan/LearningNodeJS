var express = require('express');
var app = express();

app.use(express.logger());
app.use(function (req, res) {
    res.end("Hello World");
});

app.listen(8080);
