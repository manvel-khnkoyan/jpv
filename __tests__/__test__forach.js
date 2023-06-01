import { forEach, validate } from '../dist/index.js';

describe('forEach validation', () => {
  test('all elements are strings', () => {
    const pattern = forEach(value => typeof value === 'string');
    const array = ['foo', 'bar', 'baz'];
    expect(validate(array, pattern)).toBe(true);
  });

  test('all elements are numbers', () => {
    const pattern = forEach(value => typeof value === 'number');
    const array = [1, 2, 3];
    expect(validate(array, pattern)).toBe(true);
  });

  test('mismatched type', () => {
    const pattern = forEach(value => typeof value === 'string');
    const array = ['foo', 'bar', 3];
    expect(validate(array, pattern)).toBe(false);
  });

  test('each element matches specific pattern', () => {
    const pattern = forEach(value => value.length > 3);
    const array = ['foo', 'bar', 'foobar'];
    expect(validate(array, pattern)).toBe(false);
  });

  test('validates empty array', () => {
    const pattern = forEach(value => typeof value === 'string');
    const array = [];
    expect(validate(array, pattern)).toBe(true);
  });

  test('validates non-array value', () => {
    const pattern = forEach(value => typeof value === 'string');
    const array = 'foo';
    expect(validate(array, pattern)).toBe(false);
  });

  test('validates complex pattern', () => {
    const pattern = forEach(value => Array.isArray(value) && value.length === 2 && value.every(v => typeof v === 'string'));
    const array = [['foo', 'bar'], ['baz', 'qux']];
    expect(validate(array, pattern)).toBe(true);
  });

  test('fails complex pattern', () => {
    const pattern = forEach(value => Array.isArray(value) && value.length === 2 && value.every(v => typeof v === 'string'));
    const array = [['foo', 'bar'], ['baz', 'qux'], ['foo', 'bar', 'baz']];
    expect(validate(array, pattern)).toBe(false);
  });

  test('validates with index', () => {
    let index = 0;
    const pattern = forEach((value) => value === index++);
    const array = [0, 1, 2, 3, 4];
    expect(validate(array, pattern)).toBe(true);
  });


});
