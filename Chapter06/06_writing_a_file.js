// before we used read(), now we'll use streams

var fs = require('fs');
var contents;

// INCEPTION BWAAAAAAA!!!!
var rs = fs.createReadStream("01_simple_stream.js");
var ws = fs.createWriteStream("copy of 01_simple_stream.js");


rs.pipe(ws);



