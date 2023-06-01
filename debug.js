// import { validate, strict, forEach, not } from "../dist/index.js";
const {validate} = require('../dist/index.js');

const value = { a: 1, b: 2 };
const pattern = new Date();

console.log(validate(value, pattern));
