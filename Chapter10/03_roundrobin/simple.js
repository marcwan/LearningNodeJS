
var http = require('http');

console.log(process.argv);

if (process.argv.length != 3) {
    console.log("Need a port number");
    process.exit(-1);
}

var s = http.createServer(function (req, res) {
    res.end("I listened on port " + process.argv[2] + "\n");
});

s.listen(process.argv[2]);
