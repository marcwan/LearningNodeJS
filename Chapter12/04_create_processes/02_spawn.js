
var spawn = require("child_process").spawn;    
var node;

if (process.argv.length != 3) {
    console.log("I need a script to run");
    process.exit(-1);
}

var node = spawn("node", [ process.argv[2] ]);
node.stdout.on('data', print_stdout);
node.stderr.on('data', print_stderr);
node.on('exit', exited);

function print_stdout(data) {
    console.log("stdout: " + data.toString('utf8'));
}
function print_stderr(data) {
    console.log("stderr: " + data.toString('utf8'));
}
function exited(code) {
    console.error("--> Node exited with code: " + code);
}
