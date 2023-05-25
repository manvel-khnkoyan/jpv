// Import your library
const jpv = require('../dist/index.js');

// Positive nested case
test('Nested: positive case', () => {
  const pattern = {a: {b: 'value'}};
  const obj = {a: {b: 'value'}};
  expect(jpv.validate(obj, pattern)).toBe(true);
});

// Negative nested case
test('Nested: negative case', () => {
  const pattern = {a: {b: 'value'}};
  const obj = {a: {b: 'otherValue'}};
  expect(jpv.validate(obj, pattern)).toBe(false);
});

// Nested with array
test('Nested with array: positive case', () => {
  const pattern = {a: [{b: 'value'}]};
  const obj = {a: [{b: 'value'}]};
  expect(jpv.validate(obj, pattern)).toBe(true);
});

test('Nested with array: negative case', () => {
  const pattern = {a: [{b: 'value'}]};
  const obj = {a: [{b: 'otherValue'}]};
  expect(jpv.validate(obj, pattern)).toBe(false);
});


test('Nested objects: single level, matching values, positive test', () => {
  const obj = { a: { b: 'value' } };
  const pattern = { a: { b: 'value' } };
  expect(jpv.validate(obj, pattern)).toBe(true);
});

test('Nested objects: single level, mismatched values, negative test', () => {
  const obj = { a: { b: 'wrongValue' } };
  const pattern = { a: { b: 'value' } };
  expect(jpv.validate(obj, pattern)).toBe(false);
});

test('Nested objects: single level, missing keys in object, negative test', () => {
  const obj = { a: {} };
  const pattern = { a: { b: 'value' } };
  expect(jpv.validate(obj, pattern)).toBe(false);
});

test('Nested objects: multiple levels, matching values, positive test', () => {
  const obj = { a: { b: { c: 'value' } } };
  const pattern = { a: { b: { c: 'value' } } };
  expect(jpv.validate(obj, pattern)).toBe(true);
});

test('Nested objects: multiple levels, mismatched values, negative test', () => {
  const obj = { a: { b: { c: 'wrongValue' } } };
  const pattern = { a: { b: { c: 'value' } } };
  expect(jpv.validate(obj, pattern)).toBe(false);
});

test('Nested objects: multiple levels, missing keys in object, negative test', () => {
  const obj = { a: { b: {} } };
  const pattern = { a: { b: { c: 'value' } } };
  expect(jpv.validate(obj, pattern)).toBe(false);
});

test('Nested objects: using functions in pattern, positive test', () => {
  const obj = { a: { b: 5 } };
  const pattern = { a: { b: (value) => value > 0 } };
  expect(jpv.validate(obj, pattern)).toBe(true);
});

test('Nested objects: using functions in pattern, negative test', () => {
  const obj = { a: { b: -5 } };
  const pattern = { a: { b: (value) => value > 0 } };
  expect(jpv.validate(obj, pattern)).toBe(false);
});

test('Nested objects: using regex in pattern, positive test', () => {
  const obj = { a: { b: 'hello' } };
  const pattern = { a: { b: /^h/ } };
  expect(jpv.validate(obj, pattern)).toBe(true);
});

test('Nested objects: using regex in pattern, negative test', () => {
  const obj = { a: { b: 'goodbye' } };
  const pattern = { a: { b: /^h/ } };
  expect(jpv.validate(obj, pattern)).toBe(false);
});

