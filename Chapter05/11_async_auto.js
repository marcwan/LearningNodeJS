var async = require("async");

async.auto({
    numbers: (callback) => {
        setTimeout(() => {
            callback(null, [ 1, 2, 3 ]);
        }, 1500);
    },
    strings: (callback) => {
        setTimeout(() => {
            callback(null, [ "a", "b", "c" ]);
        }, 2000);
    },
    // do not execute this until numbers and strings are done
    // thus_far is an object with numbers and strings as arrays.
    assemble: [ 'numbers', 'strings', (thus_far, callback) => {
        callback(null, {
            numbers: thus_far.numbers.join(",  "),
            strings: "'" + thus_far.strings.join("',  '") + "'"
        });
    }]
},
// this is called at the end when all other functions have executed. Optional
(err, results) => {
    if (err)
        console.log(err);
    else
        console.log(results);
});
