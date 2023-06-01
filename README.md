# JPV - JSON Pattern Validation

JPV is an powerful library that makes JSON validation simple and painless, especially when it comes to complex and nested structures. Whether your JSON is just a couple of key-value pairs or a deeply nested, intricate object, JPV provides an elegant and efficient solution for validation.

## Usage

How to use JPV to validate JSON objects:

```javascript
const jpv = require("jpv");

const object = {
  status: "OK",
  meta: {
    age: 30,
  },
};

const pattern = {
  status: /ok/i,
  meta: {
    age: (x) => x > 18,
  },
};

jpv.validate(object, pattern); // true
```

It provides a variety of validation patterns that are both robust and flexible, catering to the exact needs of your data structures. From precise values, regular expressions, and functions to nullable and strict types, JPV has got you covered. Logical operators like and, or, not add another layer of flexibility to meet your precise validation needs.

> **Warning:** JPV 3.0.0 is a significant update from the previous versions of JPV. If you encounter issues with the current version, consider using JPV 2.2.2.

## Installation

To install the library, use npm:

```bash
npm install jpv
```

Import the library as follows:

```javascript
const { validate, and, or, not, forEach, strict, nullable } = require("jpv");
```

Or, if you prefer ES6 imports:

```javascript
import { validate, and, or, not, forEach, strict, nullable } from "jpv";
```

## Exact values

JPV allows you to specify exact values in your patterns. This means that you can define a specific value that a property in your JSON object must match exactly for the validation to pass.

Exact values can be any valid JavaScript data type, including strings, numbers, booleans, null, and even arrays and objects. This makes exact value validation a very powerful feature when you know exactly what value a property should have.

```javascript
const object = {
  name: "John",
  status: true,
  version: 30,
  city: "New York",
};

const pattern = {
  name: "John",
  status: true,
  version: 30,
};
```

## Regex

Regular expression in JPV is one of the general-purpose patterns that can be used to validate a wide variety of data types.

```javascript
const object = {
  phone: "1234567890",
  name: "John",
};

const pattern = {
  phone: /^\d{10}$/,
  name: new RegExp(/^[A-Za-z]+$/),
};
```

## Arrays

Like a object, arrays are validated by specifying a pattern for each element in the array. The pattern can be any valid JPV pattern, including exact values, regular expressions, functions, and logical operators.

```javascript
const object = ['Lea', '+123456789']

const pattern = [/\w/,  /\+\d/],
```

## Array forEach

To validate each element in an array, you can use the forEach pattern that iterates over each element in the array and validates it against the specified pattern.

```javascript
const object = ["hello", "world", "example"];

const pattern = forEach(/^[a-z]+$/);
```

Another example of using forEach to validate an array of objects:

```javascript
const object = {
  status: "OK",
  data: [
    {
      name: "John",
      age: 21,
    },
    {
      name: "Mark",
      age: 25,
    },
  ],
};

const pattern = {
  status: /ok/i,
  data: forEach({
    name: /^[\w\s]+$/,
    age: x => x > 18,
  }),
};
```

## Functions

JPV allows for function-based validations, offering a high degree of flexibility. This lets you define custom validation logic that goes beyond exact matches and regular expressions. Function-based validations can incorporate complex conditions and external data checks.

Here's an example of function-based validation:

```javascript
const pattern = {
  age: (x) => typeof x === "number" && x > 18,
};
```

## Nullable

In JSON validation, you may come across properties that can be either **`null`** or **`undefined`**, or follow a certain pattern. In such cases, the nullable pattern in JPV comes in handy.

The nullable pattern allows the property value to be either **`null`** or **`undefined`**, or to match the provided condition.

Here's an example:

```javascript
const pattern = {
  address: nullable({
    street: /^[\w\s]+$/,
    city: /^[\w\s]+$/,
    country: /^[\w\s]+$/,
  }),
};
```

## Strict

In strict mode, every key in the JSON object must have a corresponding key in the pattern. If the object has extra keys that are not present in the pattern, validation will fail. Similarly, if the object is missing keys that are present in the pattern, validation will fail. This ensures the object structure precisely mirrors the pattern structure. Samilar requirements are also applied to arrays.

```javascript
const pattern = {
  address: strict({
    street: /^[\w\s]+$/,
    city: /^[\w\s]+$/,
    country: /^[\w\s]+$/,
  }),
};
```

## Operators (and, or, not)

JPV provides three logical operators: **and**, **or**, and **not**. These operators allow you to create complex validation conditions by combining different patterns. Each operator can be used with any type of pattern, offering great flexibility in constructing your validation rules.

```javascript
  and(patternA, patternB, ...)
  or(patternA, patternB, ...)
  not(pattern)
```

Pay attention to arguments, each argument itself can be a pattern or a function that returns a pattern. This allows you to create complex validation rules that can handle a wide variety of scenarios.

```javascript
  and(patternA, or( patternB1, patternB2 ), not(patternC),...)
```

In summary, JPV's logical operators allow for a powerful and flexible way to create complex validation rules that can handle a wide variety of scenarios.

```javascript
const pattern = {
  url: and(/^https:/, not(/^http:/)),
  employeeId: and(not(/^admin$/), (x) => typeof x === "string"),
  emailOrPhone: or(/^\w+@\w+\.\w+$/, /^\d{10}$/),
};
```

## Type validation

To facilitate type validation, we can create a helper function **`is`**. This function accepts a type as a parameter and returns a new function. This returned function, when given a value, compares the type of the value with the expected type, returning a boolean result.

```javascript
const is = (type) => (value) => typeof value === type;

const pattern = {
  name: is("string"),
};
```

# Changlog

This version _(3.x)_ of jpv introduces a number of changes from the previous versions (2.x). Here's a summary of the changes:

- Cleaner and more intuitive API.
- New logical operators and, or, not.
- New strict and nullable pattern types.
- Nested object validation.
- forEach pattern for validating arrays.
