
jpv
==========

**Json Pattern Validator.**  
it is an easy-to-use JSON schema validator library that validates a JSON object by given the same structural pattern.

### Main concept

Verification comes with the **jpv.validate** function (returns boolean)

```javascript
jpv.validate(
  json,   // --> The JSON Object you want to validate
  pattern // --> The json-like validation pattern
) 
```
 
| example: 

```javascript
const jpv = require("jpv");

const json = {
  status : "OK",
  data : {
    url : "http://example.com"
  }
}
const pattern = {
  status : /^OK$/,
  data : {
    url : "[url]"
  }
}

jpv.validate(json, pattern ) // true
```

## Install

Stable Release (`2.2.x`)

```sh
$ npm install jpv --save
```
or
```sh
$ yarn add jpv
```

## Regular Expressions

The easiest and most common way to compare JSON property values is to use a regular expression.

```javascript
const json = {key : "A-8", value: 18 }

const pattern = {
  key : /^[A-Z]-[0-9]$/,
  value: new RegExp(/\d/)
}

jpv.validate(json, pattern)  // true
```

`Pay attention to the type of regular expression, it should not be a string.`

```javascript
const pattern = {
  key : /^[A-Z]+$/,   // -> Right regular expression 
}
```
```javascript
const pattern = {
  key : '/^[A-Z]+$/'  // -> Wrong regular expression
}
```

## Defined Patterns

The library provides a bunch of various popular defined patterns such as email address, URL, date, etc.
There are two way to use defined patterns:

1 - using short tags 

```javascript
{ key: "[email]" }
```

2 - using "**is**" operator:

```javascript
{ key: jpv.is("email") }
```


| example of using short tag

```javascript
  const json = { key: "2017-12-25" }
  const pattern = { key: "[date]" }

  jpv.validate(json, pattern)  // true
```


| example of using "**is**" oprator

```javascript
  const json = { key: "user@gmail.com" }
  const pattern = { key: jpv.is("email") }

  jpv.validate(json, pattern)  // true
```

| few more examples

```javascript
  const json = { key: []] }
  const pattern = { key: "[empty]" }
```
```javascript
  const json = { key: "some text"] }
  const pattern = { key: "[min-length(9)]" }
```

Library-based available patterns are (with a next to valid examples)

- **double**  - *(12.258028)* 
- **naturalNumber** - *(2)*
- **number** - *(0284)* - any digital numbers
- **integer** - *(1478)*
- **url** - *(https://fb.com)*
- **alphaNumeric**  - *(a7d34)*
- **email** - *(user@example.com)*
- **date** - *(2017-05-16)*
- **datetime**  - *(2017-03-25 10:30:58.235)*
- **length(3)**  - *(abc)* - string length
- **min-length(4)**  - *(abcd)* - string minimum length
- **max-length(5)**  - *(abcde)* - string maximum length
- **eq(15)**  - *(15)* - equal the number
- **lt(17)**  - *(16)* - less then
- **gt(18)**  - *(19)* - greater then
- **lte(17)**  - *(17)* - less then or equal
- **gte(18)**  - *(18)* - greater then or equal  

  
  
## Functional Pattern

Instead of a patterns, there is also a way to customize using functions.

```javascript
  const json = {
     name: "Mister Albert"
  }
  const pattern = {
    name: (name) => name.split(' ').length > 1
  }

  jpv.validate(json, pattern)  // true
``` 
  
  
## "and", "or", "not" Logical Operators

The library allows you to create complex patterns using the logical operators: "**or**", "**and**", "**not**":

```javascript
  const json = { key: 150 }
  const pattern = {
    key: jpv.and("[eq(150)]", "(number)") 
  }
  
  jpv.validate(json, pattern) // true  
```

```javascript
  const json = { key: 150 }
  const pattern = {
    key: jpv.and("[eq(150)]", "(string)") 
  }

  jpv.validate(json, pattern) // false  
```

_“**or**”_ and _“**and**”_ operators arguments take a list of patterns or combined operators

```javascript
jpv.or(patern1, patern2, ... .)
jpv.and(patern1, patern2, ... .)
```
```javascript
jpv.and(patern1, patern2, jpv.or(patern3, patern4, ... .), ... .)
```

_"**not**"_ operator takes only one argument (others will be ignored)

```javascript
jpv.not(pattern)
```
Using logical operators easy to create big and complex conditions like this example:

```javascript
  const {and, or, not} = jpv;
  
  const jpvEmailOrPhone = or(
    and("[email]", not("bot@example.com")),
    and("[number]", "[length(10)]")
  );  

  const json = {
     key1: 'example@gmail.com',
     key2: '1234567890'
  }

  const pattern = {
    key1: jpvEmailOrPhone,
    key2: jpvEmailOrPhone
  }

  jpv.validate(json, pattern)
  // -> true
  
```
  

## Native Types 

This is the case when there is need to validate the value using native JS types. There are two ways to define:
1 - using a brackets short tags.

```javascript
{ key: "(any native type name)" }
```
2 - using "typeOf" operator
```javascript
{ key: jpv.typeOf('any native type name') }
```

| examples:

```javascript
  const json = { key: 98 }
  const pattern = { key: "(number)" } 
            // or { key: jpv.typeOf('number')} 
 ```

```javascript
  const json = { key: false }
  const pattern = { key: '(boolean)' } 
 ```
    
```javascript
  const json = { key:  [] }
  const pattern = { key: jpv.typeOf('object') } 
 ```    

## Arrays

To validate nested arrays elements all you need is to create **one** nested pattern inside an array.
Each array element will be validated according to the first element pattern.

```javascript
  const json = {
    users : [
      {
        id : 1001478,
        name : "Alisa"
      },
      {
        id : 1003476,
        name : "Bob"
      },
    ]
  }

  const pattern = {
    users : [
      {
        id: "(number)",
        name: "(string)"
      }
    ]
  }

  jpv.validate(json, pattern)
  //  true
```

## Exact values

Instead of any pattern also can be set at an exact value. Beware that when setting exact value in pattern and the JSON values must be the same type in order to be valid.

```javascript
const json = { 
  index: 999
}

jpv.validate(json, {index: 999}) // true
jpv.validate(json, {index: "999"}) // false
jpv.validate(json, {index: "[eq(999)]"}) // true
``` 

##### "exact" Operator
There is an _"**exact**"_ operator which can be useful to clear up confusion when the string looks like a short tag

```javascript
const json = { index: "[email]"}
const pattern = { index: jpv.exact("[email]") }
``` 

## Modes

There are two ```standard``` and ```strict``` modes.

```strict``` mode is used when your pattern and given JSON should contain exact fields,
while in ```standard``` mode - JSON can contain more fields than described in the pattern.

By default JPV validator used standard mode. To set up strict mode - need add 3th argument into the ```jpv.validate``` function:

```javascript
  const options = { mode: "strict" };

  // strict mode
  jpv.validate(json, pattern, options );
```

| example of usage strict and standard modes

```javascript
  const json = {
    a: 5789,
    b: "Another One"
  }

  const pattern1 = {
    a: "(number)"
  }
 
  const pattern2 = {
    a: "(number)",
    b: "(string)"
  }

  // standard mode
  jpv.validate(json, pattern1) //true

  // strict mode
  jpv.validate(json, pattern1, { mode : "strict" } ) // false
  // missing b
```


## Debugging

The *jpv.validate*  function returns only a boolean type.
But if you want more information in output about errors, just turn on debugging mode ({debug: true}) adding in the third argument of function.

```javascript
const json = { index: "Yes"}
const pattern = { index: "[number]"};

// debug mode
jpv.validate(json, pattern, {debug : true})

// error - the value of: {"index" = yes} not matched with: "[number]"
```

## TypeScript usage

```
import * as jpv from "jpv";

jpv.validate(json, pattern, false);
```

## Testing

```
sudo apt install node-tap
sudo npm install tap --dev
tap test/*.js
```
