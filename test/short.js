
var tap = require('tap');
var jpv = require('../index.js');

var json = {
    key1: [1, 2, 3],
    key2: [{
        status: true
    }]
};

var pattern1 = {
    key1: [],
    key2: [{
    }]
};

var pattern2 = {
    key2: [5]
};

tap.test('jpv.validate', function (t) {
    t.ok(jpv.validate(json, pattern1));
    t.ok(!jpv.validate(json, pattern2));
    t.end();
});
