


var waste_bin = [];



setInterval(function () {
    var b = new Buffer(1000000);
    b.fill("x");
    waste_bin.push(b);
},
1000);
