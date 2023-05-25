
const {validate, strict} = require('../dist/index.js');

describe('JPV Strict Mode', () => {
  const pattern = {
    person: strict({
      name: 'John',
      age: 30,
    }),
  };

  test('Valid strict pattern: should pass', () => {
    const object = {
      person: {
        name: 'John',
        age: 30,
      },
    };

    expect(validate(object, pattern)).toBe(true);
  });

  test('Invalid strict pattern (wrong name): should fail', () => {
    const object = {
      person: {
        name: 'Jane',
        age: 30,
      },
    };

    expect(validate(object, pattern)).toBe(false);
  });

  test('Invalid strict pattern (missing age): should fail', () => {
    const object = {
      person: {
        name: 'John',
      },
    };

    expect(validate(object, pattern)).toBe(false);
  });

  test('Invalid strict pattern (extra property): should fail', () => {
    const object = {
      person: {
        name: 'John',
        age: 30,
        city: 'San Francisco',
      },
    };

    expect(validate(object, pattern)).toBe(false);
  });

  test('Invalid strict pattern (not an object): should fail', () => {
    const object = {
      person: 'John',
    };

    expect(validate(object, pattern)).toBe(false);
  });

  test('Invalid strict pattern (null value): should fail', () => {
    const object = {
      person: null,
    };

    expect(validate(object, pattern)).toBe(false);
  });
});
