var http = require("http");

var s = http.createServer(function (req, res) {
    var body = 'Thanks for calling!\n';
    var content_length = body.lengtth;
    res.writeHead(200, {
        'Content-Length': content_length,
        'Content-Type': 'text/plain'
    });
    res.end(body);
});

/**
 * Now run the server, listening on port 8080
 */
s.listen(8080);

