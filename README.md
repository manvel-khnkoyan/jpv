## JPV - JSON Pattern Validation

JPV is an intuitive and powerful library that makes JSON validation simple and painless, especially when it comes to complex and nested structures. Whether your JSON is just a couple of key-value pairs or a deeply nested, intricate object, JPV provides an elegant and efficient solution for validation.

It provides a variety of validation patterns that are both robust and flexible, catering to the exact needs of your data structures. From precise values, regular expressions, and functions to nullable and strict types, JPV has got you covered. Logical operators like and, or, not add another layer of flexibility to meet your precise validation needs.

> **Warning:**
> JPV 3.0.0 is a significant update from the previous versions of JPV. If you encounter issues with the current version, consider using JPV 2.2.2.

### Usage

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
    age: (x) => !isNaN(x) && x > 18,
  },
};

jpv.validate(object, pattern);
// returns boolean
```

### Installation

To install the library, use npm:

```bash
npm install jpv
```

Import the library as follows:

```javascript
const { validate, and, or, not, strict, nullable } = require("jpv");
```

Or, if you prefer ES6 imports:

```javascript
import { validate, and, or, not, strict, nullable } from "jpv";
```

### Handling errors

If the object does not match the pattern, the validate function will return false and the errors array will contain the value, pattern, and nested path of the object property that failed validation:

```javascript
const jpv = require("jpv");

const object = {
  status: "OK",
  name: "John",
};

const pattern = {
  status: /ok/i,
  name: "Mark",
};

jpv.validate(object, pattern, (err) => {
  console.log(err);
  // { value: 'Mark', pattern: '"John"', path: 'person.name' }
});
```

### Exact values

JPV allows you to specify exact values in your patterns. This means that you can define a specific value that a property in your JSON object must match exactly for the validation to pass.

Exact values can be any valid JavaScript data type, including strings, numbers, booleans, null, and even arrays and objects. This makes exact value validation a very powerful feature when you know exactly what value a property should have.

```javascript
const pattern = {
  name: "John",
  age: 30,
  status: true,
};
```

### Arrays

JPV validate arrays based on certain patterns. This means that you can establish rules for each element in an array, and the library will match each element against these rules.

What's interesting about JPV is that if the array you're validating is longer than the array of rules you've provided, it doesn't just stop validating. Instead, it repeats your rules, applying them to the additional elements in the array. This is called cyclical validation.

In simpler terms, imagine you have an array of six elements you want to validate, but you only specify rules for two elements. JPV will use the two rules you've provided, then repeat those same rules for the third and fourth elements. For the fifth and sixth elements, it repeats the rules once again. This way, no matter how long your array is, JPV will keep reusing your rules in a loop until it has checked every element.

Here's an example:

```javascript
const object = {
  users: [
    { name: "John", age: 30 },
    { name: "Doe", age: 25 },
    { name: "Jane", age: 32 },
  ],
};

const pattern = {
  users: [
    {
      name: /^[\w\s]+$/,
      age: (x) => typeof x === "number" && x > 18,
    },
  ],
};
```

In another example is shown how to validate an array that contains a mix of different data types, which is validating cyclically:

```javascript
// Define the pattern array
const pattern = [/^[\w\s]+$/, (x) => typeof x === "number"];

// Define the array to validate
const array = [1, "hello", 2, "world", 3, "example"];

// Validate the array
validate(array, pattern);
```

### Nested objects

JPV provides comprehensive support for validating nested JSON objects. The nested pattern lets you drill down into the structure of your JSON object to validate its deeply nested properties.

The pattern structure should match the structure of the JSON object. For example, if you have a nested object in your JSON, you should mirror this structure in your pattern. Each key in the pattern corresponds to a key in the object and defines the validation rule for that key.

Let's look at a simple nested object validation:

```javascript
const object = {
  status: "OK",
  users: [
    {
      name: "John",
      age: 21,
      address: {
        street: "1st Street",
        city: "San Francisco",
        country: "USA",
      },
    },
    {
      name: "Mark",
      age: 25,
      address: {
        street: "2nd Street",
        city: "New York",
        country: "USA",
      },
    },
  ],
};

const pattern = {
  status: /ok/i,
  users: [
    {
      name: /^[\w\s]+$/,
      age: (x) => typeof x === "number" && x > 18,
      address: {
        street: /^[\w\s]+$/,
        city: /^[\w\s]+$/,
        country: /^[\w\s]+$/,
      },
    },
  ],
};
```

### Regex

JPV also supports regular expression validation. This allows you to define a regex pattern that a property in your JSON object should match for the validation to pass.

Regex validation is a powerful feature that allows you to check for more complex patterns in your data. For example, you can use regex validation to check if a string follows a specific format, contains certain characters, or has a certain length.

```javascript
const pattern = {
  phone: /^\d{10}$/,
  name: new RegExp(/^[A-Za-z]+$/),
};
```

### Functions

JPV allows for function-based validations, offering a high degree of flexibility. This lets you define custom validation logic that goes beyond exact matches and regular expressions. Function-based validations can incorporate complex conditions, external data checks, or even asynchronous operations (though synchronous functions are recommended for performance).

Here's an example of function-based validation:

```javascript
const pattern = {
  age: (x) => typeof x === "number" && x > 18,
};
```

### Nullable

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

### Strict

In strict mode, every key in the JSON object must have a corresponding key in the pattern. If the object has extra keys that are not present in the pattern, validation will fail. Similarly, if the object is missing keys that are present in the pattern, validation will fail. This ensures the object structure precisely mirrors the pattern structure.

```javascript
const pattern = {
  address: strict({
    street: /^[\w\s]+$/,
    city: /^[\w\s]+$/,
    country: /^[\w\s]+$/,
  }),
};
```

### Operators (and, or, not)

JPV provides three logical operators: **and**, **or**, and **not**. These operators allow you to create complex validation conditions by combining different patterns. Each operator can be used with any type of pattern, offering great flexibility in constructing your validation rules.

In summary, JPV's logical operators allow for a powerful and flexible way to create complex validation rules that can handle a wide variety of scenarios.

```javascript
const pattern = {
  url: and(/^https:/, not(/^http:/)),
  employeeId: and(not(/^admin$/), (x) => typeof x === "string"),
  emailOrPhone: or(/^\w+@\w+\.\w+$/, /^\d{10}$/),
};
```

### Type validation

To facilitate type validation, we can create a helper function, typeOf. This function accepts a type as a parameter and returns a new function. This returned function, when given a value, compares the type of the value with the expected type, returning a boolean result.

```javascript
const typeOf = type => value => typeof value === type

const pattern = {
  name: typeOf('string'),
};

```

or another approach is to use the built-in function **`isString`**

```javascript
const isString = value => typeof value === 'string'

const pattern = {
  name: isString,
};

```


## Changlog

This version _(3.0.0)_ of jpv introduces a number of changes from the previous versions. Here's a summary of the changes:

- New logical operators and, or, not.
- New strict and nullable pattern types.
- Improved error handling.
- Nested object validation.
- Full path of object property in error messages.
