
var path = require('path');


exports.version = '0.1.0';



exports.send_success = function(res, data) {
    res.writeHead(200, {"Content-Type": "application/json"});
    var output = { error: null, data: data };
    res.end(JSON.stringify(output) + "\n");
}


exports.send_failure = function(res, server_code, err) {
    var code = (err.code) ? err.code : err.name;
    res.writeHead(server_code, { "Content-Type" : "application/json" });
    res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
}


exports.error_for_resp = function (err) {
    if (!err instanceof Error) {
        console.error("** Unexpected error type! :"
                      + err.constructor.name);
        return JSON.stringify(err);
    } else {
        var code = err.code ? err.code : err.name;
        return JSON.stringify({ error: code,
                                message: err.message });
    }
}

exports.error = function (code, message) {
    var e = new Error(message);
    e.code = code;
    return e;
};

exports.file_error = function (err) {
    return exports.error("file_error", JSON.stringify(err));
};


exports.is_image = function (filename) {
    switch (path.extname(filename).toLowerCase()) {
      case '.jpg':  case '.jpeg': case '.png':  case '.bmp':
      case '.gif':  case '.tif':  case '.tiff':
        return true;
    }

    return false;
};


exports.invalid_resource = function () {
    return exports.error("invalid_resource",
                         "The requested resource does not exist.");
};


exports.missing_data = function (what) {
    return exports.error("missing_data",
                         "You must include " + what);
}


exports.not_image = function () {
    return exports.error("not_image_file",
                         "The uploaded file must be an image file.");
};


exports.no_such_album = function () {
    return exports.error("no_such_album",
                         "The specified album does not exist");
};


exports.http_code_for_error = function (err) {
    switch (err.code) {
      case "no_such_album":
        return 403;
      case "invalid_resource":
        return 404;
    }
    return 503;
}


exports.valid_filename = function (fn) {
    var re = /[^\.a-zA-Z0-9_-]/;
    return typeof fn == 'string' && fn.length > 0 && !(fn.match(re));
};
