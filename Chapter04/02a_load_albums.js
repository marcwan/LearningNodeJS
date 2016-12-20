
var http = require('http'),
    fs = require('fs');

function load_album_list(callback) {
    // we will just assume that any directory in our 'albums'
    // subfolder is an album.
    fs.readdir("albums", (err, files) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, files);
    });
}

function handle_incoming_request(req, res) {
    console.log("INCOMING REQUEST: " + req.method + " " + req.url);
    load_album_list((err, albums) => {
        if (err) {
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify(err) + "\n");
            return;
        }

        var out = { error: null, data: { albums: albums } };
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(out) + "\n");
    });
}

var s = http.createServer(handle_incoming_request);

s.listen(8080);

