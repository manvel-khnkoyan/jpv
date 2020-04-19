
const tap = require('tap');
const { validate, typeOf } = require('../index.js');

const json = {
    string: 'string',
    boolean: true,
    number: 15,
    bigint: BigInt(9007199254740991),
    symbol: Symbol('A'),
    function: () => {},
    object: [],
};

const validShortTagPattern = {
    string: '(string)',
    boolean: '(boolean)',
    number: '(number)',
    bigint: '(bigint)',
    symbol: '(symbol)',
    function: '(function)',
    object: '(object)',
};
const invalidShortTagPattern = {
    string: '(string)',
    boolean: '(boolean)',
    number: '(string)', // Invalid
    bigint: '(bigint)',
    symbol: '(symbol)',
    function: '(function)',
    object: '(object)',
};

const validOperatorPattern = {
    string: typeOf('string'),
    boolean: typeOf('boolean'),
    number: typeOf('number'),
    bigint: typeOf('bigint'),
    symbol: typeOf('symbol'),
    function: typeOf('function'),
    object: typeOf('object'),
};
const invalidOperatorTagPattern = {
    string: typeOf('string'),
    boolean: typeOf('boolean'),
    number: typeOf('number'),
    bigint: typeOf('bigint'),
    symbol: typeOf('symbol'),
    function: typeOf('function'),
    object: typeOf('function'), // invalid
};

// Valid Case
tap.test('Native Types', function (t) {
    t.ok(validate(json, validShortTagPattern, { debug: true }), 'Valid native types by short tag case');
    t.ok(!validate(json, invalidShortTagPattern, { debug: true }), 'Invalid native types by short tag case');

    t.ok(validate(json, validOperatorPattern, { debug: true }), 'Valid native types by typeOf case');
    t.ok(!validate(json, invalidOperatorTagPattern, { debug: true }), 'Invalid native types by typeOf case');
    t.end();
});
