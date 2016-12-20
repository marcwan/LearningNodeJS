

exports.group1 = { 
    setUp: function (callback) {
        // do something
        callback();
    },
    tearDown: function (callback) {
        // do something
        callback();
    },
    test1: function (test) {
        test.done();
    },
    test2: function (test) {
        test.done();
    }
};
