function ABC (parms) {
    this.varA = 10;
    this.varB = 20;
    this.functionA = function (var1, var2) {
        console.log(var1 + " " + var2);
    }
}

exports.create_ABC = function (parms) {
    return new ABC(parms);
}
