
const {strict, and, forEach, or, not, nullable, validate} = require('../dist/index.js');

describe('Validation Error Tests', () => {

  test('validate strict pattern error', () => {
    const value = { a: 1, b: 2, c: 3 };
    const pattern = strict({ a: 1, b: 2 });
    expect(validate(value, pattern)).toBe(false);
  });

  test('validate and pattern error', () => {
    const value = 15;
    const pattern = and(
      v => v > 0,
      v => v < 10
    );
    expect(validate(value, pattern)).toBe(false);
  });

  test('validate forEach pattern error', () => {
    const value = [1, 2, { a: 1, b: 3 }];
    const pattern = forEach(
      or(
        v => v < 10,
        strict({ a: 1, b: 2 })
      )
    );
    expect(validate(value, pattern)).toBe(false);
  });

  test('validate or pattern error', () => {
    const value = 15;
    const pattern = or(
      v => v < 10,
      not(v => v === 15)
    );
    expect(validate(value, pattern)).toBe(false);
  });

  test('validate not pattern error', () => {
    const value = 5;
    const pattern = not(v => v === 5);
    expect(validate(value, pattern)).toBe(false);
  });

  test('validate nullable pattern error', () => {
    const value = 5;
    const pattern = nullable(strict({ a: 1, b: 2 }));
    expect(validate(value, pattern)).toBe(false);
  });
});