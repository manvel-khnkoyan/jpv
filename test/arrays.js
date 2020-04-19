
const tap = require('tap');
const { validate, is, typeOf } = require('../index.js');

const json = {
    name: 'arrays',
    items: {
        name: 'arrays',
        list: [
            {
                name: 'Bamboo',
                cost: 180000
            },
            {
                name: 'Samboo',
                cost: -50
            }
        ]
    }
};

const validPattern = {
    name: /arrays/,
    items: {
        name: typeOf('string'),
        list: [
            {
                name: is('exist'),
                cost: typeOf('number')
            }
        ]
    }
};

const invalidPattern = {
    name: /arrays/,
    items: {
        name: typeOf('string'),
        list: [
            {
                name: is('min-length(5)'),
                cost: is('gt(0)')
            }
        ]
    }
};

// Valid Case
tap.test('Arrays', function (t) {
    t.ok(validate(json, validPattern, { debug: true }), 'Valid Case');
    t.ok(!validate(json, invalidPattern, { debug: true }), 'Invalid Case');
    t.end();
});
