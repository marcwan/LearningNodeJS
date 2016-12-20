var path = require('path'),
    fs = require('fs');

function Album (album_path) {
    this.name = path.basename(album_path);
    this.path = album_path;
}

Album.prototype.name = null;
Album.prototype.path = null;
Album.prototype._photos = null;

Album.prototype.photos = function (callback) {
    if (this._photos != null) {
        callback(null, this._photos);
        return;
    }

    fs.readdir(this.path, (err, files) => {
        if (err) {
            if (err.code == "ENOENT") {
                callback(no_such_album());
            } else {
                callback(make_error("file_error", JSON.stringify(err)));
            }
            return;
        }

        var only_files = [];

        var iterator = (index) => {
            if (index == files.length) {
                callback(null, only_files);
                return;
            }

            fs.stat(this.path + "/" + files[index], (err, stats) => {
                if (err) {
                    callback(make_error("file_error",
                                        JSON.stringify(err)));
                    return;
                }
                if (stats.isFile()) {
                    only_files.push(files[index]);
                }
                iterator(index + 1)
            });
        };
        iterator(0);
    });
};

exports.create_album = function (path) {
    return new Album(path);
};


function make_error(err, msg) {
    var e = new Error(msg);
    e.code = err;
    return e;
}


function no_such_album() {
    return make_error("no_such_album",
                      "The specified album does not exist");
}
