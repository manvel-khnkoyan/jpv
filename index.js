/*!
 * accepts
 * Copyright(c) 2018 Manvel Khnkoyan
 * MIT Licensed
 */

'use strict'

/*
 * Static Types created by Regular Expression
 */
const expressions = require('./expressions.js');

/*
* is debug mode
* */
let debug = false;

/*
* log errors
* */
const log = (text) => {
    if(debug){
        console.log(text);
    }
};


/**
 * Common comparison function
 * @param {mixed} value
 * @param {mixed} pattern
 */
const compareCommon = (value, pattern) => {

    /*
   * Special for debugging
   * */
    let res = (result) => {
        if(!result){
            log("The value of ["+JSON.stringify(value)+"] does not match with ["+JSON.stringify(pattern)+"]")
        }
        return result;
    };

    /*
    * When pattern is regex
    */
    if (pattern instanceof RegExp) {
        return res(String(value).match(pattern));
    }

    // pattern = string
    if ((typeof pattern === 'string')) {
        // Native Types
        let nativeMatches = pattern.match(/^(\!)?\((.*)\)(\?)?$/i);
        if (nativeMatches !== null) {
            let match = (value === null ? nativeMatches[2] === 'null' : (typeof value === nativeMatches[2]));
            // Negation ? Operator
            if (typeof nativeMatches[3] !== 'undefined') {
                if (value === null || typeof value === 'undefined' || value === '') {
                    return true;
                }
            }
            return res(nativeMatches[1] === '!' ? !match : match)
        }

        // Logical Types
        let logicalMatches = pattern.match(/^(\!)?\[(.*)\](\?)?$/i);
        if (logicalMatches !== null && (logicalMatches[2] in expressions)) {
            let match = (String(value).match(expressions[logicalMatches[2]]) !== null);
            // Negation ? Operator
            if (typeof logicalMatches[3] !== 'undefined') {
                if (value === null || typeof value === 'undefined' || value === '') {
                    return true
                }
            }
            return res(logicalMatches[1] === '!' ? !match : match)
        }

        // Functional Regex
        let functionalRegexMatches = pattern.match(/^(\!)?\{\/(.*)\/([a-z]*)\}(\?)?$/i);
        if (functionalRegexMatches !== null) {
            let match = (String(value).match(new RegExp(functionalRegexMatches[2], functionalRegexMatches[3])) !== null);
            // Negation ? Operator
            if (typeof functionalRegexMatches[4] !== 'undefined') {
                if (value === null || typeof value === 'undefined' || value === '') {
                    return true
                }
            }
            return res(functionalRegexMatches[1] === '!' ? !match : match)
        }

        // Functional Fixed
        let functionalFixedMatches = pattern.match(/^(\!)?\{(.*)\}(\?)?$/i);
        if (functionalFixedMatches !== null) {
            let match = (String(value) === String(functionalFixedMatches[2]));
            // Negation ? Operator
            if (typeof functionalFixedMatches[3] !== 'undefined') {
                if (value === null || typeof value === 'undefined' || value === '') {
                    return true
                }
            }
            return res(functionalFixedMatches[1] === '!' ? !match : match)
        }

        // Fixed Type
        return res(value === pattern)
    }

    // pattern = number | boolean | symbol
    if ((typeof pattern === 'number') || (typeof pattern === 'symbol') || (typeof pattern === 'boolean')) {
        return res(pattern === value)
    }

    // pattern = object
    if (typeof pattern === 'object') {
        if (typeof pattern !== typeof value) {
            return res(false)
        }
        if (pattern !== null && value !== null) {
            return res(value.constructor.name === pattern.constructor.name)
        }
        return res(value === pattern)
    }

    throw 'error: don`t use ' + (typeof pattern) + ' as a pattern value, insted of it use string format'

};

/**
 * Compare in standard
 * When given value may not contain pattern
 * @param value
 * @param pattern
 */
var compareStandard = (value, pattern) => {
    // when pattern is undefined
    if (typeof pattern === 'undefined') {
        return true
    }
    return compareCommon(value, pattern)
};

/**
 * Compare in standard
 * When given value must be exactly alike pattern
 * @param value
 * @param pattern
 */
var compareStrict = (value, pattern) => {
    // when pattern is undefined
    if (typeof pattern === 'undefined') {
        log("The value of ["+JSON.stringify(value)+"] does not match with ["+JSON.stringify(pattern)+"]");
        return false
    }
    return compareCommon(value, pattern)
};

/**
 * Comparing existence of two given values
 * When given value must be exactly alike pattern
 * @param obj1
 * @param obj2
 */
var compareExistence = (obj1, obj2) => {
    // when no object for pattern
    if (typeof obj2 === 'undefined') {
        if (typeof obj1 === 'string') {
            if ((obj1.match(/^(\!)?\[(.*)\]\?$/i) !== null) ||
                (obj1.match(/^(\!)?\((.*)\)\?$/i) !== null) ||
                (obj1.match(/^(\!)?\{(\/.*\/[a-z]*)\}\?$/i) !== null) ||
                (obj1.match(/^(\!)?\{(.*)\}\?$/i) !== null)) {
                return true
            }
        }
        log("No corresponding value for ["+JSON.stringify(obj1) +"]");
        return false
    }
    return true
};


/**
 * Iteration through each value
 * @param obj1
 * @param obj2
 * @param {boolean} valid
 * @param {function} cb
 */
var iterate = (obj1, obj2, valid, cb) => {
    /*
    * Already not valid
    * */
    if (!valid) return false;

    /*
    * Is Pattern(obj2) Primitive type
    * */
    if( obj2 !== Object(obj2) ){
        return valid = cb(obj1, obj2);
    }

    /*
    * Iterate through obj1
    * */
    for (var property in obj1) {
        if (obj1.hasOwnProperty(property)) {
            // case with null or undefined
            if (obj1[property] === null || obj2[property] === null || typeof obj1[property] === 'undefined' || typeof obj2[property] === 'undefined') {
                if (!(valid = cb(obj1[property], obj2[property]))) {
                    return false
                }
            }
            // iterate if pattern is a array
            else if ((obj2[property].constructor === Array) && (obj2[property].length > 0)) {
                if (obj1[property].constructor !== Array) {
                    if (!(valid = cb(obj1[property], obj2[property]))) {
                        return false;
                    }
                    continue;
                }
                for (let i = 0; i < obj1[property].length; i++) {
                    if (!(valid = iterate(obj1[property][i], obj2[property][0], valid, cb))) {
                        return false
                    }
                }
            }

            // iterate recursavely when object and json are objects / and when pattern has other keys
            else if ((obj1[property].constructor === Object) && (obj2[property].constructor === Object) && (Object.keys(obj2[property]).length !== 0)) {
                if (!(valid = iterate(obj1[property], obj2[property], valid, cb))) {
                    return false
                }
            }
            //
            else {
                if (!(valid = cb(obj1[property], obj2[property]))) {
                    return false
                }
            }
        }
    }

    return valid
};

/**
 * Standard validate
 * @param json
 * @param pattern
 */
var standardValidate = (json, pattern) => {
    return iterate(json, pattern, true, compareStandard) && iterate(pattern, json, true, compareExistence)
};

/**
 * Strict Validate
 * @param json
 * @param pattern
 */
var strictValidate = (json, pattern) => {
    return iterate(json, pattern, true, compareStrict) && iterate(pattern, json, true, compareExistence)
};

module.exports = {
    /**
     * Main Function
     * @param json
     * @param pattern
     * @param option // for an older version it could be boolean
     */
    validate: (json, pattern, option) => {
        // when strict is set
        if (option !== null) {
            if( (typeof option === 'boolean') && option ){
                // log("Please use validate:(json, pattern, {mode:\"strict\"}) representation for a strict mode");
                return strictValidate(json, pattern, true);
            }
            if( typeof option === 'object' ){
                debug = !!option.debug;
                if( "strict" === option.mode ){
                    return strictValidate(json, pattern, true);
                }
            }
        }
        return standardValidate(json, pattern)
    }
};
