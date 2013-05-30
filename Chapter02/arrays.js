
var car1 = [];
var car2 = new Array();
var car3 = new Array(10);
var car4 = new Array(4, 34, 6, 8, 525, 8693, 281, 88, 28, 95, 346);


// creating
var arr1 = [];
// set values

for (var i = 0; i < 10; i++) {
    arr1[i] = i;
}

// fills in undefined
arr1.length = 20;
arr1[20] = "new value";

console.log(arr1.length);
console.log(arr1[0]);
console.log(arr1);


// set values with string index
var arr2 = [];

arr2["cat"] = "meow";
arr2["dog"] = "woof";

console.log(arr2.length);
console.log(arr2[0]);
console.log(arr2);



// mixed indexes (bad idea)
var arr3 = [];

arr3[2] = 2;
arr3[3] = 3;
arr3["horse"] = "neigh";
arr3["狗"] = "王";


console.log(arr3.length);
console.log(arr3[0]);
console.log(arr3);



// multi-dimensional
//var arr4 = [][];   not ok
//var arr5 = [3][3]; // not ok

// to create a 3x3

var tx3A = new Array(new Array(3), new Array(3), new Array(3));
var tx3B = [];

for (var i = 0; i < 3; i++) {
    tx3B[i] = new Array(3);
}


console.log(tx3A);
console.log(tx3B);



// why use arrays when objects contain much of the same functionality:  V8 optmises heavily, extra operations slice(), push pop, shift, unshift


// key operations push pop
// shift unshift


var random = new Array(1, 342, 53, 38, 85958, 3584934, 8459, 2, 69, 1396, 146, 194);


// print squares
random.forEach(function (element, index, array) {
        console.log(element + "^2 = " + element * element);
});


var squares = random.map(function (element, index, array) {
        return element * element;
});
console.log(squares);

var evens_only = random.filter(function (element, index, array) {
        return (element % 2) == 0;
});
console.log(evens_only);



console.log(random.join(", "));

