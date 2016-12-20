
// regular function

function add_two(a, b) {
    return a + b;
}

console.log(add_two(1, 2));

// Anonymous function -- can be used by referring to x:
var x = function (a, b) {
    return a + b;
}

console.log(x(3, 4));

// Anonymous function -- THIS IS NOT VALID. If not used as an expression, you
// must provide a name. Uncomment this to see the error:
/*
function (a, b) {
    return a + b;
}
*/

// Arrow functions!
var y = (a , b) => a + b;
console.log(y(5, 6));

var z = (a, b) => {
    console.log("ADDING!");
    return a + b;
}
console.log(z(7, 8));

// Arguments
function add_n_methodA() {
    var sum = 0;
    for (x of arguments) {
        sum += x;
    }
    return sum;
}
function add_n_methodB() {
    var sum = 0;
    for (index in arguments) {
        sum += arguments[index];
    }
    return sum;
}
function add_n_methodC() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

console.log(add_n_methodA(1, 2, 3, 4, 5, 6, 7, 8, 9));
console.log(add_n_methodB(1, 2, 3, 4, 5, 6, 7, 8, 9));
console.log(add_n_methodC(1, 2, 3, 4, 5, 6, 7, 8, 9));
