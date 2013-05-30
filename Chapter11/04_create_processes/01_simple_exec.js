var exec = require('child_process').exec,
    child;

if (process.argv.length != 3) {
    console.log("I need a file name");
    process.exit(-1);
}

var file_name = process.argv[2];
var cmd = process.platform == 'win32' ? 'type' : "cat";
child = exec(cmd + " " + file_name, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);

    if (error) {
        console.log("Error exec'ing the file");
        console.log(error);
        process.exit(1);
    }
});
