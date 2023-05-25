// Import your library
const jpv = require('../dist/index.js');

// Using AND operator
test('AND operator: positive case', () => {
  const pattern = jpv.and('value', v => v === 'value');
  expect(jpv.validate('value', pattern)).toBe(true);
});

test('AND operator: negative case', () => {
  const pattern = jpv.and('value', v => v !== 'value');
  expect(jpv.validate('value', pattern)).toBe(false);
});

// Using OR operator
test('OR operator: positive case', () => {
  const pattern = jpv.or('value', 'otherValue');
  expect(jpv.validate('value', pattern)).toBe(true);
});

test('OR operator: negative case', () => {
  const pattern = jpv.or('value1', 'value2');
  expect(jpv.validate('otherValue', pattern)).toBe(false);
});
