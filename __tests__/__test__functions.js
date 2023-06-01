const jpv = require('../dist/index.js');

test('matches function', () => {
  expect(jpv.validate({ age: 20 }, { age: x => typeof x === 'number' && x > 18 })).toBe(true);
});

test('does not match failing function', () => {
  expect(jpv.validate({ age: 15 }, { age: x => typeof x === 'number' && x > 18 })).toBe(false);
});

test('matches function with string', () => {
  expect(jpv.validate({ name: 'John' }, { name: x => typeof x === 'string' })).toBe(true);
});

test('does not match function with non-string', () => {
  expect(jpv.validate({ name: 123 }, { name: x => typeof x === 'string' })).toBe(false);
});

test('matches function with array', () => {
  expect(jpv.validate({ numbers: [1, 2, 3] }, { numbers: x => Array.isArray(x) })).toBe(true);
});

test('matches function with array', () => {
  expect(jpv.validate({ 
    numbers: [1, 2, 3] 
  }, { numbers: x => Array.isArray(x) })).toBe(true);
});


test('does not match function with non-array', () => {
  expect(jpv.validate({ numbers: '1,2,3' }, { numbers: x => Array.isArray(x) })).toBe(false);
});
