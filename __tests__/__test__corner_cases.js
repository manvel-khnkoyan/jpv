
const {validate} = require('../dist/index.js');

describe('JPV Corner Cases', () => {
  const pattern = {
    name: 'John',
    age: 30,
  };

  test('Manipulation of prototype should not affect validation', () => {
    const object = {
      name: 'John',
      age: 30,
    };
    object.__proto__.name = 'Jane';
    expect(validate(object, pattern)).toBe(true);
  });

  test('Manipulation of constructor should not affect validation', () => {
    const object = {
      name: 'John',
      age: 30,
    };
    object.constructor.prototype.name = 'Jane';
    expect(validate(object, pattern)).toBe(true);
  });

  test('Manipulation of toString should not affect validation', () => {
    const object = {
      name: 'John',
      age: 30,
    };
    object.toString = () => 'Jane';
    expect(validate(object, pattern)).toBe(true);
  });

  test('Manipulation of constructor with function type pattern', () => {
    const object = {
      name: () => 'John',
      age: 30,
    };
    object.constructor.prototype.name = () => 'Jane';
    const funcPattern = {
      name: (x) => x(),
      age: 30,
    };
    expect(validate(object, funcPattern)).toBe(true);
  });

  test('Manipulation of prototype with function type pattern', () => {
    const object = {
      name: () => 'John',
      age: 30,
    };
    object.__proto__.name = () => 'Jane';
    const funcPattern = {
      name: (x) => x(),
      age: 30,
    };
    expect(validate(object, funcPattern)).toBe(true);
  });

  test('Manipulation of prototype to null', () => {
    const object = {
      name: 'John',
      age: 30,
    };
    object.__proto__ = null;
    expect(validate(object, pattern)).toBe(false);
  });

  test('Manipulation of constructor to null', () => {
    const object = {
      name: 'John',
      age: 30,
    };
    object.constructor = null;
    expect(validate(object, pattern)).toBe(false);
  });

  test('Manipulation of toString to null', () => {
    const object = {
      name: 'John',
      age: 30,
    };
    object.toString = null;
    expect(validate(object, pattern)).toBe(true);
  });

  test('Manipulation of toString, constructor and prototype', () => {
    const object = {
      name: 'John',
      age: 30,
    };
    object.toString = () => 'Jane';
    object.constructor.prototype.name = 'Jane';
    object.__proto__.name = 'Jane';
    expect(validate(object, pattern)).toBe(true);
  });
});
