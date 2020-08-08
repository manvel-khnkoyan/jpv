
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

// Corrupted Array Cases

const corruptedArray1 = {
    name: 'Corrupted Array 1',
    items: {
        sneakyStuff: 'Don\'t tell anyone, but I\'m not actually an array.',
        constructor: [].constructor
    }
};

const corruptedArray2 = {
    name: 'Corrupted Array 2',
    items: '[object Array]'
};

const corruptedArray3 = {
    name: 'Corrupted Array 3',
    items: {
        constructor: 'Array'
    }
};

const normalArray1 = {
    items: ['Normal One', 1, {}]
};

const corruptedCheckPattern = {
    items: []
};

// Valid Case
tap.test('Arrays Corrupted case', function (t) {
    t.ok(!validate(corruptedArray1, corruptedCheckPattern, { debug: true }), 'Corrupted Array 1');
    t.ok(!validate(corruptedArray2, corruptedCheckPattern, { debug: true }), 'Corrupted Array 2');
    t.ok(!validate(corruptedArray3, corruptedCheckPattern, { debug: true }), 'Corrupted Array 3');
    t.ok(validate(normalArray1, corruptedCheckPattern, { debug: true }), 'Corrupted Array Normmal Case');
    t.end();
});
