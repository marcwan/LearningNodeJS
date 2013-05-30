

var b = new Buffer(10000);
var str = "我叫王马克";

b.write(str); // default is utf8, which is what we want

console.log( b.length );


// byteLength is useful for working with UTF-8 and buffers
console.log( str.length );
console.log( Buffer.byteLength(str) );


var b1 = new Buffer("My name is ");
var b2 = new Buffer("Marc");
var b3 = Buffer.concat([ b1, b2 ]);
console.log(b3.toString('utf8'));


var bb = new Buffer(100);
bb.fill("\0");

console.log(bb.readInt8(0));
