

exports.async1 = function (test) {
    setTimeout(function () {
        test.equal(true, true);
        test.done();
    }, 2000);
};


exports.async2 = function (test) {
    setTimeout(function () {
        test.equal(true, true);
        test.done();
    }, 1400);
};


