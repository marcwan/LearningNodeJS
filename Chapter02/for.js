
var x = [ 1, 2, 3, 4, 5, 6, 7 ];
var obj = { a: 1, b : 2, c: 3 };


console.log("\ntraditional for loop on an array:");
for (var i = 0; i < x.length; i++) {
    console.log(x[i]);
}

// for...in loop does NOT guarantee order!!
console.log("\nfor...in on an array:");
for (var idx in x) {
    console.log(x[idx]);
}

console.log("\nfor...of loop on an array:");
for (var value of x) {
    console.log(value);
}

console.log("\nfor...in loop on an object:");
for (var key in obj) {
    console.log(`${key} --> ${obj[key]}`);
}

console.log("\ntraditional for loop on an object:");
for (var key in Object.keys(obj)) {
    console.log(`${key} --> ${obj[key]}`);
}

console.log("\nfor...of for simple object:");
try {
    for (var value of obj) {
        console.log(value);
    }
} catch (e) {
    console.log("This object is not iterable, so you can't use for...of");
}


