const jpv = require('../dist/index.js');

test('matches exact array', () => {
  expect(jpv.validate({ numbers: [1, 2, 3] }, { numbers: [1, 2, 3] })).toBe(true);
});

test('does not match different array', () => {
  expect(jpv.validate({ numbers: [1, 2, 4] }, { numbers: [1, 2, 3] })).toBe(false);
});

test('matches array of objects', () => {
  const data = { people: [{ name: 'John' }, { name: 'Jane' }, { name: 'Mark' } ] };
  const pattern = { people: [{ name: 'John' }, { name: 'Jane' }] };
  expect(jpv.validate(data, pattern)).toBe(true);
});

test('does not match array with different objects', () => {
  const data = { people: [{ name: 'John' }, { name: 'Jane' }] };
  const pattern = { people: [{ name: 'John' }, { name: 'Alice' }] };
  expect(jpv.validate(data, pattern)).toBe(false);
});

test('matches array with regex', () => {
  const data = { words: ['hello', 'world'] };
  const pattern = { words: [/^h/, /^w/] };
  expect(jpv.validate(data, pattern)).toBe(true);
});

test('does not match array with failing regex', () => {
  const data = { words: ['hello', 'world'] };
  const pattern = { words: [/^h/, /^m/] };
  expect(jpv.validate(data, pattern)).toBe(false);
});
