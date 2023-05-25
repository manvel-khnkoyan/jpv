
import {validate, strict} from './src/index.mjs';

const pattern = {
    status: /ok/i,
    name: /^\w+$/,
    meta: {
        age: x => !isNaN(x) && x > 18,
    },
  };
  
  const object = {
    status: 'OK',
    name: 'John',
    meta: {
        age: 30,
    },
  };
  

console.log(validate(object, pattern));