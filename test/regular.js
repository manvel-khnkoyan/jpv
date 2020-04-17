/*!
 * accepts
 * Copyright(c) 2020 Manvel Khnkoyan
 * MIT Licensed
 */

var jpv = require('../index.js');

var json = {
    key1: ''
};

var pattern = {
    key1: jpv.and('[url]?')
};

console.log(jpv.validate(json, pattern, { debug: true }));
