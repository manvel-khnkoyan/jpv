
const tap = require('tap');
const { validate, is, and, or, not, typeOf } = require('../index.js');

const json = {
    key: 'OK',
    value: 999
};

const validPattern1 = {
    key: and(typeOf('string'), is('length(2)'), 'OK'),
    value: or(is('lt(100)'), and( not('1000'), is('lte(999)'), is('gt(900)'))),
};

const invalidPattern1 = {
    key: and(typeOf('string'), is('length(2)'), 'OK'),
    value: or(is('lt(100)'), and( not('1000'), is('lt(999)'), is('gt(900)'))),
};

const invalidPattern2 = {
    key: and(typeOf('string'), is('length(2)'), 'OK'),
    value: or(is('lt(100)'), and( not(is('eq(999)')), is('lt(9999)'), is('gt(900)'))),
};



// Valid Case
tap.test('Operators', function (t) {
    t.ok(validate(json, validPattern1, { debug: true }), 'Valid case 1');
    t.ok(!validate(json, invalidPattern1, { debug: true }), 'Invalid case 1');
    t.ok(!validate(json, invalidPattern2, { debug: true }), 'Invalid case 2');


    t.end();
});
