#!/usr/local/bin/node


console.log("argv[0] is always the interpreter: " + process.argv[0]);
console.log("argv[0] is always the running script: " + process.argv[1]);
console.log("The rest are additional arguments you gave on the command line.");

for (var i = 2; i < process.argv.length; i++) {
    console.log("program parameter " + (i - 2) + " : "
                + process.argv[i]);
}

