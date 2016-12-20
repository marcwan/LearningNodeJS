var rpn = require('./rpn.js');


exports.addition = function (test) {
    test.expect(4);
    test.equals(rpn.compute(prep("1 2 +")), 3);
    test.equals(rpn.compute(prep("1 2 3 + +")), 6);
    test.equals(rpn.compute(prep("1 2 + 5 6 + +")), 14);
    test.equals(rpn.compute(prep("1 2 3 4 5 6 7 + + + + + +")), 28);
    test.done();
};

exports.subtraction = function (test) {
    test.expect(4);
    test.equals(rpn.compute(prep("7 2 -")), 5);
    test.equals(rpn.compute(prep("7 2 5 - -")), 10);
    test.equals(rpn.compute(prep("7 2 - 10 2 - -")), -3);
    test.equals(rpn.compute(prep("100 50 20 15 5 5 - - - - -")), 55);
    test.done();
};

exports.multiplication = function (test) {
    test.expect(3);
    test.equals(rpn.compute(prep("4 5 *")), 20);
    test.equals(rpn.compute(prep("4 5 8 * *")), 160);
    test.equals(rpn.compute(prep("4 5 * 2 3 * *")), 120);
    test.done();
};

exports.division = function (test) {
    test.expect(3)
    test.equals(rpn.compute(prep("39 13 /")), 3);
    test.equals(rpn.compute(prep("9 39 13 / /")), 3);
    test.equals(rpn.compute(prep("18 27 39 13 / / /")), 2);
    test.done();
};

exports.decimals = function (test) {
    test.expect(2);
    test.equals(rpn.compute(prep("3.14159 5 *")), 15.70795);
    test.equals(rpn.compute(prep("100 3 /")), 33.333333333333336);
    test.done();
};

exports.empty = function (test) {
    test.expect(1);
    test.throws(rpn.compute([]));
    test.done();
};


function prep(str) {
    return str.trim().split(/[ ]+/);
}

