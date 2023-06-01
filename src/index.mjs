// Helper function to check if the object is a plain object (not an array or a null value)
const isPlainObject = (obj) =>
  typeof obj === "object" && obj !== null && !Array.isArray(obj) && obj.constructor === Object;

class Pattern {
  constructor(name, argument) {
    this.name = name;
    this.argument = argument;
  }
}

// Function to strictly enforce a pattern
export const strict = (pattern) => new Pattern("strict", pattern);

// Function to enforce that all of the conditions should be true
export const and = (...conditions) => new Pattern("and", conditions);

// forEach function to apply a pattern cyclically
export const forEach = (fn) => new Pattern("forEach", fn);

// Function to enforce that any of the conditions should be true
export const or = (...conditions) => new Pattern("or", conditions);

// Function to negate a condition
export const not = (condition) => new Pattern("not", condition);

// Function to enforce a condition but also accept null
export const nullable = (condition) => new Pattern("nullable", condition);

// Main validating function to compare the value with the pattern
export const validate = (value, pattern) => {
  if (pattern instanceof Pattern) {
    // Check strict pattern

    if (pattern.name === "strict") {
      // Strict pattern should be an object (or an array)
      if (
        typeof value !== typeof pattern.argument &&
        typeof value !== "object" &&
        typeof value !== "boolean" &&
        typeof value !== "number" &&
        typeof value !== "string"
      ) {
        return false;
      }

      // when a pure object
      if (isPlainObject(value)) {
        const valueKeys = Object.keys(value);
        const patternKeys = Object.keys(pattern.argument);

        if (valueKeys.length !== patternKeys.length) {
          return false;
        }

        const keySet = new Set(patternKeys);
        if (!valueKeys.every((key) => keySet.has(key))) {
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
      return value.every((item) => {
        return validate(item, pattern.argument);
      });
    }

    // All conditions in the 'and' array should validate
    if (pattern.name === "and") {
      return pattern.argument.every((cond) =>
        validate(value, cond)
      );
    }

    // Any condition in the 'or' array should match
    if (pattern.name === "or") {
      return pattern.argument.some((cond) =>
        validate(value, cond)
      );
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

    throw new Error(`Unknown pattern ${pattern.name}`);
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

    return pattern.every((p, i) =>
      validate(value[i], p)
    );
  }

  // If the pattern is a regular expression, test the value against it
  if (pattern instanceof RegExp) {
    if (
      (typeof value !== "string" && typeof value !== "number") ||
      !pattern.test(value)
    ) {
      return false;
    }
    return true;
  }

  // If the pattern is an object, check every property in the object recursively
  if (isPlainObject(pattern)) {
    if (!isPlainObject(value)) {
      return false;
    }

    return Object.keys(pattern).every((key) => {
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
