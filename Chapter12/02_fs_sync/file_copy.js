#!/usr/local/bin/node
var fs = require('fs'),
    path = require('path');

var BUFFER_SIZE = 1000000;

function copy_file_sync (src, dest) {
    var read_so_far, fdsrc, fddest, read;
    var buff = new Buffer(BUFFER_SIZE);

    fdsrc = fs.openSync(src, 'r');
    fddest = fs.openSync(dest, 'w');
    read_so_far = 0;

    do {
        read = fs.readSync(fdsrc, buff, 0, BUFFER_SIZE, read_so_far);
        fs.writeSync(fddest, buff, 0, read);
        read_so_far += read;
    } while (read > 0);

    fs.closeSync(fdsrc);
    return fs.closeSync(fddest);
}


if (process.argv.length != 4) {
    console.log("Usage: " + path.basename(process.argv[1], '.js') 
                + " [src_file] [dest_file]");
} else {
    try {
        copy_file_sync(process.argv[2], process.argv[3]);
    } catch (e) {
        console.log("Error copying file:");
        console.log(e);
        process.exit(-1);
    }

    console.log("1 file copied.");
}
