


const {strict, validate} = require('../dist/index.js');

describe('Validation Pattern Hacking Tests', () => {

    /*
  test('unexpected pattern type', () => {
    const value = { a: 1, b: 2 };
    const pattern = new Date();
    expect(() => validate(value, pattern)).toBe(false);
  }); */

  test('unexpected pattern value', () => {
    const value = { a: 1, b: 2 };
    const pattern = strict({ a: 1, b: NaN });
    expect(validate(value, pattern)).toBe(false);
  });

  test('unexpected object structure', () => {
    const value = { a: 1, b: 2 };
    const pattern = strict({ a: 1, b: { c: 3 } });
    expect(validate(value, pattern)).toBe(false);
  });

  test('invalid regex pattern', () => {
    const value = "abc";
    const pattern = /d/;
    expect(validate(value, pattern)).toBe(false);
  });

  test('unexpected function behavior', () => {
    const value = "abc";
    const pattern = v => { throw new Error("Unexpected behavior"); };
    expect(() => validate(value, pattern)).toThrow();
  });

  /* 
  test('recursive pattern', () => {
    const value = { a: 1, b: 2 };
    const recursivePattern = {};
    recursivePattern.self = recursivePattern;
    expect(() => strict(recursivePattern)).toBe(false);
  });
  */
});
