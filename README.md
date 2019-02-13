
jpv
==========

Json Pattern Validator.

***jpv***  - is a easy use validator library, designed special for large and complex json schemes.


There are dozen methods and functions could useful to validate any type of json.
You can use static or native methods, or you can write your own regular expression for each field.
JPV validator also works with Array and has clever functionalities like a "Logical negation".

## Install

Stable Release (`1.5.x`)

```sh
$ npm install jpv --save
```


## Simple Usage

```javascript

import jpv from 'jpv';

var json = {
  status : 'OK',
  data : {
    url : 'http://example.com'
  }
}

var pattern = {
  status : /^OK$/,
  data : {
    url : "[url]"
  }
}

console.log( jpv.validate(json, pattern ) )

```

> validate() method returns boolean (true/false)


## Pattern

There are many patterns to use : **Fixed**, **Native**, **Defined**, **Regex**, **Functional-Regex**, **Functional-Fixed** and **Constructor**.


### Fixed Pattern

*Fixed Pattern* is designed for validating json by exact values.

```javascript
  var pattern = {
    id : 100,
    data : {
      item : {
        status : "OK"
      }
    }
  }
```

> "Fixed Pattern" requires to use identical types.

```javascript

  var json = {
    id : 100
  }

  // 1 pattern
  var pattern1 = {
    id : 100
  }

  // 2 pattern
  var pattern2 = {
    id : "100"
  }

  console.log( jpv.validate(json, pattern1) )
  // --> true
  console.log( jpv.validate(json, pattern2) )
  // --> false

  // because pattern type is a string not number

```


### Native Pattern : (type)

*Native Pattern* is used to validating json object based on javascript native types : **boolean**,**null**,**undefined**,**number**,**string**,**symbol** and **object**.


```javascript

  var json = {
    key1 : 98,
    key2 : false,
    key3 : null,
    key4 : {
      key5 : 1
    }
  }

  var pattern = {
    key1 : '(number)',
    key2 : '(boolean)',
    key3 : '(null)',
    key4 : '(object)'
  }

  console.log( jpv.validate(json, pattern) )
  // --> true
```


### Defined Pattern : [defined_type]

*Defined Pattern* is made to facilitate using most tedious patterns such as a email, date and etc.

```javascript

  var json = {
    a : '2017-12-25',
    b : 'user@gmail.com',
    c : []
  }

  var pattern = {
    a : '[date]',
    b : '[email]',
    c : '[empty]'
  }

  console.log( jpv.validate(json, pattern) )
  // --> true
```

Available Defined Patterns:

| Pattern              | Example                   |
| ---------------------|:-------------------------:|
| exist                |                           |
| empty                | []                        |
| boolean              | True                      |
| double               | 12.258028                 |
| naturalNumber        | 2                         |
| number               | 0284                      |
| integer              | 1478                      |
| url                  | https://fb.com            |
| alphaNumeric         | a7                        |
| email                | user@example.com          |
| date                 | 2017-05-12                |
| datetime             | 2017-03-25 10:30:58.235   |



### Regular Expression

```javascript

  var json = {
    key : 'A-8'
  }

  var pattern = {
    key : /^[A-Z]-[0-9]$/
  }

  console.log( jpv.validate(json, pattern) )
  // --> true
```


###  Functional-Regex : {regex}

> "Functional Patterns" is used to implement logical conditions, which is described below.

```javascript

  var json = {
    key : 'A-8'
  }

  var pattern = {
    key : '{/[A-Z]-[0-9]/}'
  }

  console.log( jpv.validate(json, pattern) )
  // --> true
```


###  Functional-Fixed Pattern : {fixed_value}

```javascript

  var json = {
    key : '7'
  }

  var pattern = {
    key : '{7}'
  }

  console.log( jpv.validate(json, pattern) )
  // --> true
```

> Values in Functional scopes **{}** is always converting to string.


### Constructor

This pattern is helpful when described pattern is an object, instead of a primitive type. For this special case comparison goes by object constructor.

Example: 1

```javascript

  var json = {
    a : [ 1, 2, 3],
    b : {
      c : '1'
    }
  }

  var pattern = {
    a : [],
    b : {}
  }

  console.log( jpv.validate(json, pattern) )
  // --> true
```

Example: 2

```javascript

  var json = {
    key : [1,2,3]
  }

  var pattern = {
    key : [4]
  }

  console.log( jpv.validate(json, pattern) )
  // --> true

  // because comparison is going by constructors, but not by values
  // [1,2,3].constructor === [4].constructor

```


## Modes

There are two ```standard``` and ```strict``` modes. To use strict mode, need to add third boolean argument in validate function.

In standard mode "pattern" can miss properties or can be empty, but in strict mode validation object and pattern must have the same "key-value" hierarchy.

```javascript

  var json = {
    a : 5789,
    b : "Another One"
  }

  var pattern1 = {
    a : '(number)'
  }

  // standard mode
  console.log(  jpv.validate(json, pattern1)  )
  // --> true

  // strict mode
  console.log(  jpv.validate(json, pattern1, { mode : "strict" } ) )
  // --> false
  // missed b

  var pattern2 = {
    a : '(number)',
    b : '(string)'
  }

  // strict mode
  console.log(  jpv.validate(json, pattern2, { mode : "strict" } ) )
  // --> true

```


## Logical negation (!) operator

Negations ("!") operator is used for only *Native*, *Defined* and *Functional* patterns.

Example 1:

```javascript

  var json = {
    a : 5789
  }

  var pattern = {
    a : '!(number)'
  }

  console.log( jpv.validate(json, pattern) )
  // --> false

```

Example 2:

```javascript

  var json = {
    a : [2],
    b : "Yes",
    c : [2,3],
    d : "No",
    e : "1"
  }

  var pattern = {
    a : '!(number)',
    b : '!(number)',
    c : '![empty]',
    d : '!{/Yes/i}',
    e : '!{2}'
  }

  // strict mode
  console.log(  jpv.validate(json, pattern, { mode : "strict" }) )
  // --> true
```

Example 3:

```javascript

  var json = {
    key : {}
  };

  var pattern = {
    key : '![number]'
  };

  console.log(  jpv.validate(json, pattern)  )
  // --> true
```


## Empty or Match (?) Operator

This operator is used when given value can be empty or undefined. It works like a regex **?** operator.

Current operator (**?**) is used together with *Native*, *Defined* and *Functional* patterns.

 Example 1:

```javascript

  var a = {

  }
  var b = {
    key : 5
  }
  var c = {
    key : ""
  }
  var d = {
    key : "A"
  }

  var pattern = {
    key : '[number]?'
  }

  console.log( jpv.validate(a, pattern) )
  // --> true
  console.log( jpv.validate(b, pattern) )
  // --> true
  console.log( jpv.validate(c, pattern) )
  // --> true
  console.log( jpv.validate(d, pattern) )
  // --> false

```

Example 2:

```javascript

  var a = {

  }
  var b = {
    key : '1'
  }
  var c = {
    key : 'a'
  }

  var pattern = {
    key : '{/^[0-9]$/}?'
  }

  console.log( jpv.validate( a, pattern) )
  // --> true
  console.log( jpv.validate( b, pattern) )
  // --> true
  console.log( jpv.validate( c, pattern) )
  // --> false

```


### Arrays

This special pattern is used to validate nested arrays elements. All you need is to create **one** nested pattern inside an array.
In this case, every object in array is being validated according the pattern - described on first element of an array.

```javascript

  var json = {
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

  var pattern = {
    users : [
      {
        id : '(number)',
        name : '(string)'
      }
    ]
  }

  console.log( jpv.validate(json, pattern) )
  // --> true

```


### Debug

jpv.validate function returns only boolean, this function tells us is json valid or not.
But if you want to debug - you can turn on debug mode ({debug : true}), to see errors in your console.

```

var json = "Yes";
var pattern = "[number]";

// debug mode
console.log( jpv.validate(json, pattern, {debug : true}) )

// output :
// The value of ["OK"] does not match with ["[number]"]
// --> false

```


### Testing

```
sudo apt install node-tap
sudo npm install tap
tap test/*.js
```
