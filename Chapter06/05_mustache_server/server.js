
var http = require('http'),
    async = require('async'),
    path = require("path"),
    fs = require('fs'),
    url = require('url');

function serve_static_file(file, res) {
    var rs = fs.createReadStream(file);
    rs.on('error', (e) => {
        res.writeHead(404, { "Content-Type" : "application/json" });
        var out = { error: "not_found",
                    message: "'" + file + "' not found" };
        res.end(JSON.stringify(out) + "\n");
        return;
    });

    var ct = content_type_for_file(file);
    res.writeHead(200, { "Content-Type" : ct });
    rs.pipe(res);
}

function content_type_for_file (file) {
    var ext = path.extname(file);
    switch (ext.toLowerCase()) {
        case '.html': return "text/html";
        case ".js": return "text/javascript";
        case ".css": return 'text/css';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return 'text/plain';
    }
}

function load_album_list(callback) {
    // we will just assume that any directory in our 'albums'
    // subfolder is an album.
    fs.readdir("albums", (err, files) => {
        if (err) {
            callback({ error: "file_error",
                       message: JSON.stringify(err) });
            return;
        }

        var only_dirs = [];

        async.forEach(files, (element, cb) => {
            fs.stat("albums/" + element, (err, stats) => {
                if (err) {
                    cb({ error: "file_error",
                         message: JSON.stringify(err) });
                    return;
                }
                if (stats.isDirectory()) {
                    only_dirs.push({ name: element });
                }
                cb(null);
            }                    
                   );
        },
        (err) => {
            callback(err, err ? null : only_dirs);
        });
    });
}

function load_album(album_name, page, page_size, callback) {
    fs.readdir("albums/" + album_name, (err, files) => {
        if (err) {
            if (err.code == "ENOENT") {
                callback(no_such_album());
            } else {
                callback({ error: "file_error",
                           message: JSON.stringify(err) });
            }
            return;
        }

        var only_files = [];
        var path = "albums/" + album_name + "/";

        async.forEach(files, (element, cb) => {
            fs.stat(path + element, (err, stats) => {
                if (err) {
                    cb({ error: "file_error",
                         message: JSON.stringify(err) });
                    return;
                }
                if (stats.isFile()) {
                    var obj = { filename: element,
                                desc: element };
                    only_files.push(obj);
                }
                cb(null);
            });
        },
        function (err) {
            if (err) {
                callback(err);
            } else {
                var start = page * page_size;
                var photos = only_files.slice(start, start + page_size);
                var obj = { short_name: album_name.substring(1),
                            photos: photos };
                callback(null, obj);
            }
        });
    });
}

/**
 * All pages come from the same one skeleton HTML file that
 * just changes the name of the JavaScript loader that needs to be
 * downloaded.
 */
function serve_page(req, res) {
    var page = get_page_name(req);

    fs.readFile('basic.html', (err, contents) => {
        if (err) {
            send_failure(res, 500, err);
            return;
        }

        contents = contents.toString('utf8');

        // replace page name, and then dump to output.
        contents = contents.replace('{{PAGE_NAME}}', page);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(contents);
    });
}

function handle_incoming_request(req, res) {
    // parse the query params into an object and get the path
    // without them. (2nd param true = parse the params).
    req.parsed_url = url.parse(req.url, true);
    var core_url = req.parsed_url.pathname;

    // test this fixed url to see what they're asking for
    if (core_url.substring(0, 7) == '/pages/') {
        serve_page(req, res);
    } else if (core_url.substring(0, 11) == '/templates/') {
        serve_static_file("templates/" + core_url.substring(11), res);
    } else if (core_url.substring(0, 9) == '/content/') {
        serve_static_file("content/" + core_url.substring(9), res);
    } else if (core_url == '/albums.json') {
        handle_list_albums(req, res);
    } else if (core_url.substr(0, 7) == '/albums'
               && core_url.substr(core_url.length - 5) == '.json') {
        handle_get_album(req, res);
    } else {
        send_failure(res, 404, invalid_resource());
    }
}


function handle_list_albums(req, res) {
    load_album_list((err, albums) => {
        if (err) {
            send_failure(res, 500, err);
            return;
        }

        send_success(res, { albums: albums });
    });
}


function handle_get_album(req, res) {
    // get the GET params
    var album_name = get_album_name(req);
    var getp = get_query_params(req);
    var page_num = getp.page ? getp.page : 0;
    var page_size = getp.page_size ? getp.page_size : 1000;

    if (isNaN(parseInt(page_num))) page_num = 0;
    if (isNaN(parseInt(page_size))) page_size = 1000;

    load_album(album_name, page_num, page_size, (err, album_contents) => {
        if (err && err == "no_such_album") {
            send_failure(res, 404, err);
        }  else if (err) {
            send_failure(res, 500, err);
        } else {
            send_success(res, { album_data: album_contents });
        }
    });
}


function send_success(res, data) {
    res.writeHead(200, {"Content-Type": "application/json"});
    var output = { error: null, data: data };
    res.end(JSON.stringify(output) + "\n");
}
function send_failure(res, server_code, err) {
    var code = (err.code) ? err.code : err.name;
    res.writeHead(server_code, { "Content-Type" : "application/json" });
    res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
}
function invalid_resource() {
    return { error: "invalid_resource",
             message: "the requested resource does not exist." };
}
function no_such_album() {
    return { error: "no_such_album",
             message: "The specified album does not exist" };
}
function get_album_name(req) {
    var core_url = req.parsed_url.pathname;
    return core_url.substr(7, core_url.length - 12);
}
function get_template_name(req) {
    var core_url = req.parsed_url.pathname;
    return core_url.substring(11);       // remove /templates/
}
function get_query_params(req) {
    return req.parsed_url.query;
}
function get_page_name(req) {
    var core_url = req.parsed_url.pathname;
    var parts = core_url.split("/");
    return parts[2];
}


var s = http.createServer(handle_incoming_request);
s.listen(8080);
