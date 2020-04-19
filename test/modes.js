
const tap = require('tap');
const jpv = require('../index.js');

const json = {
    key1: 'OK',
    key2: {
        url: 'http://example.com'
    },
    key3: '17850',
    key4: '2012-10-06T04:13:00+00:00'
};

const pattern = {
    key2: {
        url: '[url]'
    },
    key3: new RegExp('[0-9]+', 'i'),
    key4: '[datetime]',
};

const pattern2 = {
    key1: 'OK',
    key2: {
        url: '[url]'
    },
    key3: new RegExp('[0-9]+', 'i'),
    key4: '[datetime]',
    key5: '(undefined)'
};

tap.test('jpv.validate', function (t) {
    t.ok(jpv.validate(json, pattern, { debug: true }), 'Validate json Pattern');
    t.ok(jpv.validate(json, pattern2, { debug: true }), 'Validate json Pattern');
    t.ok(!jpv.validate(json, pattern, { debug: true, mode: 'strict' }), 'Validate json Pattern');
    t.ok(!jpv.validate(json, pattern2, { debug: true, mode: 'strict' }), 'Validate json Pattern');
    t.end();
});
