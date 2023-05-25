// Import your library
const jpv = require('../dist/index.js');

test('Throws when pattern is not an object', () => {
  const errFunc = jest.fn();
  jpv.validate({a: 'value'}, 'string', errFunc);
  expect(errFunc).toHaveBeenCalled();
});

test('Throws when value does not match pattern', () => {
  const pattern = {a: 'value'};
  const obj = {a: 'otherValue'};
  const errFunc = jest.fn();
  jpv.validate(obj, pattern, errFunc);
  expect(errFunc).toHaveBeenCalled();
});

test('Throws when value does not match complex pattern', () => {
  const pattern = {a: {b: 'value'}};
  const obj = {a: {b: 'otherValue'}};
  const errFunc = jest.fn();
  jpv.validate(obj, pattern, errFunc);
  expect(errFunc).toHaveBeenCalled();
});
