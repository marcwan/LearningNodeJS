

var obj1 = {};
var obj2 = new Object();

var json_syntax = { 
    "field" : "value",
    "field2" : 234,
    "field3" : [ 1 , 2, 3 ],
    "field4" : {
        "subfield1" : "value1"
    }
}

var obj_notation = {
    field: "value",
    field2: 234,
    field3: [ 1, 2, 3 ],
    field4 : {
        subfield1 : 'value1',
    },
}

console.log(JSON.stringify(obj_notation));
console.log("\n");
console.log(JSON.stringify(obj_notation, 0, 2));
console.log("\n");
console.log(JSON.parse(JSON.stringify(obj_notation)));

for (key in obj_notation) {
    console.log(`${key} : ${obj_notation[key]}`);
}
