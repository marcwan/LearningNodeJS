var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

function load_file_contents2(filename, callback) {
    var errorHandler = (err) => {
        console.log("SO SAD: " + err);
        callback(err, null);
    }

    fs.openAsync(filename, 'r')
        .then(function (fd) {
            fs.fstatAsync(fd)
                .then(function (stats) {
                    if (stats.isFile()) {
                        var b = new Buffer(stats.size);
                        return fs.readAsync(fd, b, 0, stats.size, null)
                            .then(fs.closeAsync(fd))
                            .then(function () {
                                callback(null, b.toString('utf8'))
                            })
                            .catch(errorHandler);
                    }
                })
        })
        .catch(errorHandler);
}


load_file_contents2('test.txt', function (err, results) {
    console.log("ERR: " + err);
    console.log("RESULTS: " + results);
});

