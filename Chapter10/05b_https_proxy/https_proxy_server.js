var httpProxy = require('http-proxy'),
    https = require('https'),
    fs = require('fs');

// 1. Get certificates ready.
var privateKey = fs.readFileSync('privkey.pem').toString();
var certificate = fs.readFileSync('newcert.pem').toString();

var options = {
    key : privateKey,
    cert : certificate
}

// 2. Create an instance of HttpProxy to use with another server
var proxy = httpProxy.createProxyServer({});

// 3. Create https server and start accepting connections.
https.createServer(options, function (req, res) {
    proxy.web(req, res, { target: "http://localhost:8081" });
}).listen(8443);
