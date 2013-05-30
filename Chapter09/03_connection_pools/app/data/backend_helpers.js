
var fs = require('fs');


exports.verify = function (data, field_names) {
    for (var i = 0; i < field_names.length; i++) {
        if (!data[field_names[i]]) {
            throw exports.error("missing_data",
                                field_names[i] + " not optional");
        }
    }

    return true;
}

exports.error = function (code, message) {
    var e = new Error(message);
    e.code = code;
    return e;
};

exports.file_error = function (err) {
    return exports.error("file_error", JSON.stringify(err.message));
}



/**
 * Possible signatures:
 *  src, dst, callback
 *  src, dst, can_overwrite, callback
 */
exports.file_copy = function () {

    var src, dst, callback;
    var can_overwrite = false;

    if (arguments.length == 3) {
        src = arguments[0];
        dst = arguments[1];
        callback = arguments[2];
    } else if (arguments.length == 4) {
        src = arguments[0];
        dst = arguments[1];
        callback = arguments[3];
        can_overwrite = arguments[2]
    }

    function copy(err) {
        var is, os;
 
        if (!err && !can_overwrite) {
            return callback(backhelp.error("file_exists",
                                     "File " + dst + " exists."));
        }
 
        fs.stat(src, function (err) {
            if (err) {
                return callback(err);
            }

            is = fs.createReadStream(src);
            os = fs.createWriteStream(dst);
            is.on('end', function () { callback(null); });
            is.on('error', function (e) { callback(e); });
            is.pipe(os);
        });
    }
    
    fs.stat(dst, copy);
};



exports.valid_filename = function (fn) {
    var re = /[^\.a-zA-Z0-9_-]/;
    return typeof fn == 'string' && fn.length > 0 && !(fn.match(re));
};


exports.db_error = function () {
    return exports.error("server_error",
        "Something horrible has happened with our database!");
};

exports.album_already_exists = function () {
    return exports.error("album_already_exists",
                         "An album with this name already exists.");
};

exports.missing_data = function (field) {
    return exports.error("missing_data", "You must provide: " + field);
};

exports.no_such_user = function () {
    return exports.error("no_such_user",
                         "The specified user does not exist");
};


exports.user_already_registered = function () {
    return exports.error("user_already_registered",
                         "This user appears to exist already!");
};



/**
 * node-mysql sometimes adds extra data to callbacks to be helpful.
 * this can mess up our waterfall, however, so we'll strip those
 * out.
 */
exports.mscb = function (cb) {
    return function (err, results) {
        cb(err, results);
    }
}
