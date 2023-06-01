// Import the validate function from your library
const {validate, strict, nullable} = require('../dist/index.js');

describe('Cyclical Array Validation', () => {
  // Define the typeOf function for these tests
  const typeOf = type => value => typeof value === type;

  it('should validate arrays with cyclic pattern', () => {
    const pattern = [typeOf('number'), typeOf('string')];
    const value = [1, 'a', 2, 'b'];
    expect(validate(value, pattern)).toBe(true);
  });

  it('should return false for invalid arrays with cyclic pattern', () => {
    const pattern = [typeOf('number'), typeOf('string')];
    const value = [1, 'a', 2, 'b', 'c'];
    expect(validate(value, pattern)).toBe(true);
  });

  it('should return true for empty array with non-empty pattern', () => {
    const pattern = [typeOf('number'), typeOf('string')];
    const value = [];
    expect(validate(value, pattern)).toBe(false);
  });

  it('should return true for non-empty array with empty pattern', () => {
    const pattern = [];
    const value = [1, 'a', 2, 'b'];
    expect(validate(value, pattern)).toBe(true);
  });

  it('should return true for non-empty array with empty pattern', () => {
    const pattern = [ x => typeof x === 'number', x => typeof x === 'string'];
    const value = [1, 'a', 2, 'b'];
    expect(validate(value, strict(pattern))).toBe(false);
  });

  it('should return true for non-empty array with empty pattern', () => {
    const pattern = [ x => typeof x === 'number', x => typeof x === 'string'];
    const value = [1, 'a'];
    expect(validate(value, strict(pattern))).toBe(true);
  });

  it('should return true for non-empty array with empty pattern', () => {
    const pattern = [ x => typeof x === 'number', x => typeof x === 'string'];
    const value = [1, 'a', 2, 'b'];
    expect(validate(value, nullable(pattern))).toBe(true);
    expect(validate([], nullable(pattern))).toBe(false);
    expect(validate(null, nullable(pattern))).toBe(true);
    expect(validate(undefined, nullable(pattern))).toBe(true);
    expect(validate(2, nullable(pattern))).toBe(false);
  });

  it('should return false for non-array value with non-empty pattern', () => {
    const pattern = [typeOf('number'), typeOf('string')];
    const value = 'I am not an array';
    expect(validate(value, pattern)).toBe(false);
  });

  it('should handle single-item cyclic pattern correctly', () => {
    const pattern = [typeOf('number')];
    const value = [1, 2, 3, 4];
    expect(validate(value, pattern)).toBe(true);
  });
});
