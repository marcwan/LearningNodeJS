
var fs = require('fs');

function FileObject () {

    this.filename = '';

    this.file_exists = function (callback) {
        if (!this.filename) {
            var e = new Error("invalid_filename");
            e.description = "You need to provide a valid filename";
            callback(e);
            return;
        }

        console.log("About to open: " + this.filename);
        fs.open(this.filename, 'r', function (err, handle) {
            if (err) {
                console.log("Can't open: " + this.filename);
                callback(err, false);
                return;
            }

            console.log("can open: " + this.filename);
            fs.close(handle, function () { });
            callback(null, true);
        });
    };
}

var fo = new FileObject();
fo.filename = "file_that_does_not_exist";

fo.file_exists(function (err, results) {
    if (err) {
        console.log("\nError opening file: " + JSON.stringify(err));
        return;
    }

    console.log("file exists!!!");
});



