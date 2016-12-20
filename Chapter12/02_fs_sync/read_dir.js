#!/usr/local/bin/node

var fs = require('fs');

var files = fs.readdirSync(".");
console.log(files);

