var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    httpProxy = require('http-proxy');


var options = {
    https: {
        key: fs.readFileSync('privkey.pem', 'utf8'),
        cert: fs.readFileSync('newcert.pem', 'utf8')
    }
};


//
// Create a standalone HTTPS proxy server
//
//httpProxy.createServer(8000, 'localhost', options).listen(8001);


//
// Create an instance of HttpProxy to use with another HTTPS server
//
var proxy = new httpProxy.HttpProxy({
    target: {
        host: 'localhost', 
        port: 8081
    }
});

https.createServer(options.https, function (req, res) {
    proxy.proxyRequest(req, res)
}).listen(443);

