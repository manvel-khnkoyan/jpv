"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.strict = exports.or = exports.nullable = exports.not = exports.and = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
// my-library.js

// Helper function to check if the object is a plain object (not an array or a null value)
var isPlainObject = function isPlainObject(obj) {
  return _typeof(obj) === "object" && obj !== null && !Array.isArray(obj);
};

// Function to strictly enforce a pattern
var strict = function strict(pattern) {
  return {
    strict: true,
    pattern: pattern
  };
};

// Function to enforce that all of the conditions should be true
exports.strict = strict;
var and = function and() {
  for (var _len = arguments.length, conditions = new Array(_len), _key = 0; _key < _len; _key++) {
    conditions[_key] = arguments[_key];
  }
  return {
    and: conditions
  };
};

// Function to enforce that any of the conditions should be true
exports.and = and;
var or = function or() {
  for (var _len2 = arguments.length, conditions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    conditions[_key2] = arguments[_key2];
  }
  return {
    or: conditions
  };
};

// Function to negate a condition
exports.or = or;
var not = function not(condition) {
  return {
    not: condition
  };
};

// Function to enforce a condition but also accept null
exports.not = not;
var nullable = function nullable(condition) {
  return {
    nullable: true,
    pattern: condition
  };
};

// Main validating function to compare the value with the pattern
exports.nullable = nullable;
var validate = function validate(value, pattern) {
  var err = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  // Check strict pattern
  if (pattern.strict) {
    if (_typeof(value) !== _typeof(pattern.pattern)) {
      err({
        value: value,
        pattern: "strict(".concat(JSON.stringify(pattern), ")"),
        path: path
      });
      return false;
    }
    if (isPlainObject(value)) {
      var valueKeys = Object.keys(value);
      var patternKeys = Object.keys(pattern.pattern);
      if (valueKeys.length !== patternKeys.length) {
        err({
          value: value,
          pattern: "strict(".concat(JSON.stringify(pattern), ")"),
          path: path
        });
        return false;
      }
      var keySet = new Set(patternKeys);
      if (!valueKeys.every(function (key) {
        return keySet.has(key);
      })) {
        err({
          value: value,
          pattern: "strict(".concat(JSON.stringify(pattern), ")"),
          path: path
        });
        return false;
      }
    }
    if (Array.isArray(value)) {
      if (value.length !== pattern.pattern.length) {
        err({
          value: value,
          pattern: "strict(".concat(JSON.stringify(pattern), ")"),
          path: path
        });
        return false;
      }
    }
    return validate(value, pattern.pattern, err, path);
  }

  // All conditions in the 'and' array should validate
  if (pattern.and) {
    return pattern.and.every(function (cond) {
      return validate(value, cond, err, path);
    });
  }

  // Any condition in the 'or' array should match
  if (pattern.or) {
    return pattern.or.some(function (cond) {
      return validate(value, cond, err, path);
    });
  }

  // Negate the condition in 'not'
  if (pattern.not) {
    return !validate(value, pattern.not, err, path);
  }

  // Accept null or matching condition in 'nullable'
  if (pattern.nullable) {
    if (value === null || typeof value === "undefined") {
      return true;
    }
    return validate(value, pattern.pattern, err, path);
  }

  // If the pattern is an array, check every item in the array recursively
  if (Array.isArray(pattern)) {
    if (!Array.isArray(value)) {
      err({
        value: value,
        pattern: JSON.stringify(pattern),
        path: path
      });
      return false;
    }
    // Apply the pattern cyclically
    if (pattern.length === 0) {
      return true;
    }
    return value.every(function (v, i) {
      return validate(v, pattern[i % pattern.length], err, "".concat(path, "[").concat(i, "]"));
    });
  }

  // If the pattern is a regular expression, test the value against it
  if (pattern instanceof RegExp) {
    if (typeof value !== "string" && typeof value !== "number" || !pattern.test(value)) {
      err({
        value: value,
        pattern: pattern.source,
        path: path
      });
      return false;
    }
    return true;
  }

  // If the pattern is an object, check every property in the object recursively
  if (isPlainObject(pattern)) {
    if (!isPlainObject(value)) {
      err({
        value: value,
        pattern: JSON.stringify(pattern),
        path: path
      });
      return false;
    }
    return Object.keys(pattern).every(function (key) {
      return validate(value[key], pattern[key], err, path ? "".concat(path, ".").concat(key) : key);
    });
  }

  // If the pattern is a function, invoke it with the value
  if (typeof pattern === "function") {
    if (!pattern(value)) {
      err({
        value: value,
        pattern: pattern.toString(),
        path: path
      });
      return false;
    }
    return true;
  }

  // If the pattern is a primitive value, compare it directly with the value
  if (pattern !== value) {
    err({
      value: value,
      pattern: JSON.stringify(pattern),
      path: path
    });
    return false;
  }
  return true;
};
exports.validate = validate;