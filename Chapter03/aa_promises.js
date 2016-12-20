
var fs = require("fs");

function readJSONFile(filename, callback) {
    fs.readFile(filename, (err, contents) => {
        if (err) {
            callback(err);
        } else {
            try {
                var parsed = JSON.parse(contents);
                callback(null, parsed);
            } catch (e) {
                callback(e);
            }
        }
    });
}



readJSONFile("test.json", (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(results, 0, 2));
    }
});
