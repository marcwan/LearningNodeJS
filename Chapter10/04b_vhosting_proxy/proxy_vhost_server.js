
var httpProxy = require('http-proxy');

var options = {
  hostnameOnly: true,
  router: {
    'app1': '127.0.0.1:8081',
    'app2': '127.0.0.1:8082',
    'app3': '127.0.0.1:8083'
  }
}

var proxyServer = httpProxy.createServer(options);
proxyServer.listen(8080);
