var async = require("async");

async.series({
    numbers: (callback) => {
        setTimeout(function () {
            callback(null, [ 1, 2, 3 ]);
        }, 1500);
    },
    strings: (callback) => {
        setTimeout(function () {
            callback(null, [ "a", "b", "c" ]);
        }, 2000);
    }
},
function (err, results) {
    console.log(results);
});
