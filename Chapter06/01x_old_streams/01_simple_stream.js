// before we used read(), now we'll use streams

var fs = require('fs');
var contents;

// INCEPTION BWAAAAAAA!!!!
var rs = fs.createReadStream("01_simple_stream.js");

rs.on('data', function (data) {
    if (!contents) 
        contents = data;
    else
        contents = contents.concat(data);
});

rs.on('end', function () {
    console.log("read in the file contents: ");
    console.log(contents.toString('utf8'));
});


