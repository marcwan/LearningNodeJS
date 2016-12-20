// before we used read(), now we'll use streams

var fs = require('fs');
var contents;

// INCEPTION BWAAAAAAA!!!!
var rs = fs.createReadStream("01_simple_stream.js");

rs.on('readable', () => {
    var str;
    var d = rs.read();
    if (d) {
        if (typeof d == 'string') {
            str = d;
        } else if (typeof d == 'object' && d instanceof Buffer) {
            str = d.toString('utf8');
        }
        if (str) {
            if (!contents) 
                contents = d;
            else
                contents += str;
        }
    }
});

rs.on('end', () => {
    console.log("read in the file contents: ");
    console.log(contents.toString('utf8'));
});


