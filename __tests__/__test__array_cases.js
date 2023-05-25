const {validate} = require('../dist/index.js');

describe('JPV Array Impersonation Cases', () => {
  const pattern = [
    'John',
    30
  ];

  test('Object impersonating array with altered constructor', () => {
    const object = {
      0: 'John',
      1: 30,
      length: 2,
    };
    object.constructor = Array;
    expect(validate(object, pattern)).toBe(false);
  });

  test('Nested object impersonating array with altered constructor', () => {
    const object = {
      name: {
        0: 'John',
        1: 30,
        length: 2,
      },
    };
    object.name.constructor = Array;
    const nestedPattern = {
      name: pattern,
    };
    expect(validate(object, nestedPattern)).toBe(false);
  });

  test('Object impersonating array with altered constructor and invalid content', () => {
    const object = {
      0: 'John',
      1: 35, // age is incorrect
      length: 2,
    };
    object.constructor = Array;
    expect(validate(object, pattern)).toBe(false);
  });

  test('Nested object impersonating array with altered constructor and invalid content', () => {
    const object = {
      name: {
        0: 'John',
        1: 35, // age is incorrect
        length: 2,
      },
    };
    object.name.constructor = Array;
    const nestedPattern = {
      name: pattern,
    };
    expect(validate(object, nestedPattern)).toBe(false);
  });

  test('Object impersonating array with altered constructor but no length property', () => {
    const object = {
      0: 'John',
      1: 30,
    };
    object.constructor = Array;
    expect(validate(object, pattern)).toBe(false);
  });

  test('Nested object impersonating array with altered constructor but no length property', () => {
    const object = {
      name: {
        0: 'John',
        1: 30,
      },
    };
    object.name.constructor = Array;
    const nestedPattern = {
      name: pattern,
    };
    expect(validate(object, nestedPattern)).toBe(false);
  });
});
