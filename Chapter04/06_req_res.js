
var http = require('http');

function handle_incoming_request(req, res) {
    console.log("---------------------------------------------------");
    console.log(req.headers);
    console.log("---------------------------------------------------");
    console.log(res);
    console.log("---------------------------------------------------");
    res.writeHead(200, { "Content-Type" : "application/json" });
    res.end(JSON.stringify( { error: null }) + "\n");
}


var s = http.createServer(handle_incoming_request);
s.listen(8080);

