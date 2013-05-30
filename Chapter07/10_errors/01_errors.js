
var express = require('express');
var app = express();

app.get('/', function(req, res){
    throw new Error("Something bad happened");
    res.send('Probably will never get to this message.\n');
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500);
    var err = err instanceof Error
        ? { error: "server_error", message: err.message }
        : err;

    res.end(JSON.stringify(err) + "\n");
});

app.listen(8080);


