
var fs = require('fs');

function FileObject () {

    this.filename = '';

    this.file_exists = function (callback) {
        var self = this;

        if (!this.filename) {
            var e = new Error("invalid_filename");
            e.description = "You need to provide a valid filename";
            callback(e);
            return;
        }

        console.log("About to open: " + self.filename);
        fs.open(this.filename, 'r', function (err, handle) {
            if (err) {
                console.log("Can't open: " + self.filename);
                callback(err, false);
                return;
            }

            fs.close(handle, function () { });
            callback(null, true);
        });
    };
}

var fo = new FileObject();
fo.filename = "file_that_does_not_exist";

fo.file_exists(function (err, results) {
    if (err) {
        console.log("\nError looking for file: : " + JSON.stringify(err));
        return;
    }

    console.log("file exists!!!");
});



