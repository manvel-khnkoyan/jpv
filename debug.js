
import {validate, strict} from './src/index.mjs';

const pattern = [
  x =>  typeof x === 'number',
  x =>  typeof x === 'string',
];

const object = [1, 'a', 2, 'b'];

console.log(validate(object, strict(pattern)));