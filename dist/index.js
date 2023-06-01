"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.strict = exports.or = exports.nullable = exports.not = exports.forEach = exports.and = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
// Helper function to check if the object is a plain object (not an array or a null value)
var isPlainObject = function isPlainObject(obj) {
  return _typeof(obj) === "object" && obj !== null && !Array.isArray(obj) && obj.constructor === Object;
};
var Pattern = /*#__PURE__*/_createClass(function Pattern(name, argument) {
  _classCallCheck(this, Pattern);
  this.name = name;
  this.argument = argument;
}); // Function to strictly enforce a pattern
var strict = function strict(pattern) {
  return new Pattern("strict", pattern);
};

// Function to enforce that all of the conditions should be true
exports.strict = strict;
var and = function and() {
  for (var _len = arguments.length, conditions = new Array(_len), _key = 0; _key < _len; _key++) {
    conditions[_key] = arguments[_key];
  }
  return new Pattern("and", conditions);
};

// forEach function to apply a pattern cyclically
exports.and = and;
var forEach = function forEach(fn) {
  return new Pattern("forEach", fn);
};

// Function to enforce that any of the conditions should be true
exports.forEach = forEach;
var or = function or() {
  for (var _len2 = arguments.length, conditions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    conditions[_key2] = arguments[_key2];
  }
  return new Pattern("or", conditions);
};

// Function to negate a condition
exports.or = or;
var not = function not(condition) {
  return new Pattern("not", condition);
};

// Function to enforce a condition but also accept null
exports.not = not;
var nullable = function nullable(condition) {
  return new Pattern("nullable", condition);
};

// Main validating function to compare the value with the pattern
exports.nullable = nullable;
var validate = function validate(value, pattern) {
  if (pattern instanceof Pattern) {
    // Check strict pattern

    if (pattern.name === "strict") {
      // Strict pattern should be an object (or an array)
      if (_typeof(value) !== _typeof(pattern.argument) && _typeof(value) !== "object" && typeof value !== "boolean" && typeof value !== "number" && typeof value !== "string") {
        return false;
      }

      // when a pure object
      if (isPlainObject(value)) {
        var valueKeys = Object.keys(value);
        var patternKeys = Object.keys(pattern.argument);
        if (valueKeys.length !== patternKeys.length) {
          return false;
        }
        var keySet = new Set(patternKeys);
        if (!valueKeys.every(function (key) {
          return keySet.has(key);
        })) {
          return false;
        }
      }

      // When an array
      if (Array.isArray(value)) {
        if (value.length !== pattern.argument.length) {
          return false;
        }
      }

      // when primitive type
      return validate(value, pattern.argument);
    }
    if (pattern.name === "forEach") {
      if (!Array.isArray(value)) {
        return false;
      }

      // Iterate over each item, validate using pattern.arguments.each and if validation fails, return false
      return value.every(function (item) {
        return validate(item, pattern.argument);
      });
    }

    // All conditions in the 'and' array should validate
    if (pattern.name === "and") {
      return pattern.argument.every(function (cond) {
        return validate(value, cond);
      });
    }

    // Any condition in the 'or' array should match
    if (pattern.name === "or") {
      return pattern.argument.some(function (cond) {
        return validate(value, cond);
      });
    }

    // Negate the condition in 'not'
    if (pattern.name === "not") {
      return !validate(value, pattern.argument);
    }

    // Accept null or matching condition in 'nullable'
    if (pattern.name === "nullable") {
      if (value === null || typeof value === "undefined") {
        return true;
      }
      return validate(value, pattern.argument);
    }
    throw new Error("Unknown pattern ".concat(pattern.name));
  }

  // If the pattern is an array, check every item in the array recursively
  if (Array.isArray(pattern)) {
    if (!Array.isArray(value)) {
      return false;
    }
    // Apply the pattern cyclically
    if (pattern.length === 0) {
      return true;
    }
    return pattern.every(function (p, i) {
      return validate(value[i], p);
    });
  }

  // If the pattern is a regular expression, test the value against it
  if (pattern instanceof RegExp) {
    if (typeof value !== "string" && typeof value !== "number" || !pattern.test(value)) {
      return false;
    }
    return true;
  }

  // If the pattern is an object, check every property in the object recursively
  if (isPlainObject(pattern)) {
    if (!isPlainObject(value)) {
      return false;
    }
    return Object.keys(pattern).every(function (key) {
      return validate(value[key], pattern[key]);
    });
  }

  // If the pattern is a function, invoke it with the value
  if (typeof pattern === "function") {
    if (!pattern(value)) {
      return false;
    }
    return true;
  }

  // If the pattern is a primitive value, compare it directly with the value
  if (pattern !== value) {
    return false;
  }
  return true;
};
exports.validate = validate;