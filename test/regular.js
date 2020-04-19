/*!
 * accepts
 * Copyright(c) 2020 Manvel Khnkoyan
 * MIT Licensed
 */

const jpv = require('../index.js');
const { and, exact, is, or, not, typeOf } = jpv;
const jpvEmailOrPhone = or(
    and('[email]', not('bot@example.com')),
    and('[number]', '[length(10)]')
);

const json = {
    simple: {
        key: 'OK',
        value: 'A-5'
    },
    native: {
        key: 'name',
        value: 15
    },
    patterns: {
        key: 'name',
        value: 999,
        items: []
    },
    operatiors: {
        key: 150,
        emailOrPhone: '1234567890'
    },
    functional: {
        name: 'Mister Albert'
    },
    exact: {
        email: '[email]'
    },
    strict: true

};

const pattern = {
    simple: {
        key: 'OK',
        value: /^[A-Z]-[0-9]$/
    },
    native: {
        key: '(string)',
        value: typeOf('number'),
        status: typeOf('undefined')
    },
    patterns: {
        key: '[min-length(4)]',
        value: is('lt(1000)'),
        items: '[empty]'
    },
    operatiors: {
        key: and('[eq(150)]', '(number)'),
        emailOrPhone: jpvEmailOrPhone
    },
    functional: {
        name: (name) => name.split(' ').length > 1
    },
    exact: {
        email: exact('[email]')
    }
};

console.log(jpv.validate(json, pattern, { debug: true, strict: true }));
