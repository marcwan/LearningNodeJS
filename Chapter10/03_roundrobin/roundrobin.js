var httpProxy = require('http-proxy'),
    fs = require('fs');

var servers = JSON.parse(fs.readFileSync('server_list.json')).servers;

var s = httpProxy.createServer(function (req, res, proxy) {
    var target = servers.shift();         // 1. Remove first server
    proxy.proxyRequest(req, res, target);   // 2. Re-route to that server
    servers.push(target);                 // 3. Add back to end of list
});


s.listen(8080);