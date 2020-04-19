
const tap = require('tap');
const { validate, is, typeOf, exact } = require('../index.js');

const json = {
    key1: 'OK',
    key2: 'Yes',
    key3: () => {
    },
};

const validPattern1 = {
    key1: /OK/,
    key2: (val) => val === 'Yes',
    key3: '(function)'
};

const validPattern2 = {
    key1: exact('OK'),
    key2: (val) => val === 'Yes',
    key3: typeOf('function')
};

const invalidPattern1 = {
    key1: /OK/,
    key2: (val) => val === 'no',
    key3: '(function)'
};


// Valid Case
tap.test('Functional', function (t) {
    t.ok(validate(json, validPattern1, { debug: true }), 'Valid Case 1');
    t.ok(validate(json, validPattern2, { debug: true }), 'Valid Case 2');
    t.ok(!validate(json, invalidPattern1, { debug: true }), 'Invalid Case 1');
    t.end();
});
