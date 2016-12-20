
var fs = require('fs');
var async = require('async');


function load_file_contents(path, callback) {
    fs.open(path, 'r', (err, f) => {
        if (err) {
            callback(err);
            return;
        } else if (!f) {
            callback(make_error("invalid_handle",
                                "bad file handle from fs.open"));
            return;
        }
        fs.fstat(f, (err, stats) => {
            if (err) {
                callback(err);
                return;
            }
            if (stats.isFile()) {
                var b = new Buffer(stats.size);
                fs.read(f, b, 0, stats.size, null, (err, br, buf) => {
                    if (err) {
                        callback(err);
                        return;
                    }

                    fs.close(f, (err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        callback(null, b.toString('utf8', 0, br));
                    });
                });
            } else {
                calback(make_error("not_file", "Can't load directory"));
                return;
            }
        });
    });
}

function load_file_contents2(path, callback) {
    var f;
    async.waterfall([
        function (cb) {             // cb stands for "callback"
            fs.open(path, 'r', cb);
        },
        // the handle was passed to the callback at the end of
        // the fs.open function call. async passes ALL params to us.
        function (handle, cb) {
            f = handle
            fs.fstat(f, cb);
        },
        function (stats, cb) {
            var b = new Buffer(stats.size);
            if (stats.isFile()) {
                fs.read(f, b, 0, stats.size, null, cb);
            } else {
                calback(make_error("not_file", "Can't load directory"));
            }
        },
        function (bytes_read, buffer, cb) {
            fs.close(f, function (err) {
                if (err)
                    cb(err);
                else
                    cb(null, buffer.toString('utf8', 0, bytes_read));
            })
        }
    ],
    // called after all fns have finished, or then there is an error.
    function (err, file_contents) {
        callback(err, file_contents);
    });
}



load_file_contents(
    "test.txt", 
    function (err, contents) {
        if (err)
            console.log(err);
        else
            console.log(contents);
    }
);

load_file_contents2(
    "test.txt", 
    function (err, contents) {
        if (err)
            console.log(err);
        else
            console.log(contents);
    }
);

function make_error(err, msg) {
    var e = new Error(msg);
    e.code = msg;
    return e;
}

