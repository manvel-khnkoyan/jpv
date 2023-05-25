// my-library.js

// Helper function to check if the object is a plain object (not an array or a null value)
const isPlainObject = (obj) =>
  typeof obj === "object" && obj !== null && !Array.isArray(obj);

// Function to strictly enforce a pattern
export const strict = (pattern) => ({ strict: true, pattern });

// Function to enforce that all of the conditions should be true
export const and = (...conditions) => ({ and: conditions });

// Function to enforce that any of the conditions should be true
export const or = (...conditions) => ({ or: conditions });

// Function to negate a condition
export const not = (condition) => ({ not: condition });

// Function to enforce a condition but also accept null
export const nullable = (condition) => ({ nullable: true, pattern: condition });


// Main validating function to compare the value with the pattern
export const validate = (value, pattern, err = () => {}, path = null) => {
  // Check strict pattern
  if (pattern.strict) {
    if (typeof value !== typeof pattern.pattern) {
      err({ value, pattern: `strict(${JSON.stringify(pattern)})`, path });
      return false;
    }
    if (isPlainObject(value)) {
      const valueKeys = Object.keys(value);
      const patternKeys = Object.keys(pattern.pattern);

      if (valueKeys.length !== patternKeys.length) {
        err({ value, pattern: `strict(${JSON.stringify(pattern)})`, path });
        return false;
      }

      const keySet = new Set(patternKeys);
      if (!valueKeys.every((key) => keySet.has(key))) {
        err({ value, pattern: `strict(${JSON.stringify(pattern)})`, path });
        return false;
      }
    }
    return validate(value, pattern.pattern, err, path);
  }

  // All conditions in the 'and' array should validate
  if (pattern.and) {
    return pattern.and.every((cond) => validate(value, cond, err, path));
  }

  // Any condition in the 'or' array should match
  if (pattern.or) {
    return pattern.or.some((cond) => validate(value, cond, err, path));
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
      err({ value, pattern: JSON.stringify(pattern), path });
      return false;
    }
    return value.every((v, i) => validate(v, pattern[i], err, `${path}[${i}]`));
  }

  // If the pattern is a regular expression, test the value against it
  if (pattern instanceof RegExp) {
    if (
      (typeof value !== "string" && typeof value !== "number") ||
      !pattern.test(value)
    ) {
      err({ value, pattern: pattern.source, path });
      return false;
    }
    return true;
  }

  // If the pattern is an object, check every property in the object recursively
  if (isPlainObject(pattern)) {
    if (!isPlainObject(value)) {
      err({ value, pattern: JSON.stringify(pattern), path });
      return false;
    }

    return Object.keys(pattern).every((key) => {
      return validate(
        value[key],
        pattern[key],
        err,
        path ? `${path}.${key}` : key
      );
    });
  }

  // If the pattern is a function, invoke it with the value
  if (typeof pattern === "function") {
    if (!pattern(value)) {
      err({ value, pattern: pattern.toString(), path });
      return false;
    }
    return true;
  }

  // If the pattern is a primitive value, compare it directly with the value
  if (pattern !== value) {
    err({ value, pattern: JSON.stringify(pattern), path });
    return false;
  }
  return true;
};
