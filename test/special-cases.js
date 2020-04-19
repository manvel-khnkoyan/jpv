
const tap = require('tap');
const jpv = require('../index.js');
const {is} = jpv;

const json = {
    key1: 'OK',
    key2: NaN,
};

const pattern = {
    key1: 1,
    key2: is('eq(10)')
};

tap.test('Special Cases', function (t) {
    t.ok(!jpv.validate(json, pattern, { debug: true }), 'Case 1');
    t.end();
});
