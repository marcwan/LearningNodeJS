var express = require('express'),
    https = require('https'),
    fs = require('fs');

// 1. Load certificates and create options
var privateKey = fs.readFileSync('privkey.pem').toString();
var certificate = fs.readFileSync('newcert.pem').toString();

var options = {
    key : privateKey,
    cert : certificate
}

// 2. Create express app and set up routing, etc.
var app = express();
app.get("*", function (req, res) {
      res.end("Thanks for calling securely!\n");
});


// 3. start https server with options and express app.
https.createServer(options, app).listen(443, function(){
    console.log("Express server listening on port " + 443);
});
