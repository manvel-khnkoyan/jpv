
jpv
==========

Json Pattern Validator.

***jpv***  - designed for validating json schemas using similar json patterns.

## Install

Release (`1.1.x`)

```sh
$ npm install jpv --save
```

## Usage

Create pattern, then use ``` validate ``` method to validate. 

> validate() method returns boolean (true/false) 

```javascript

// import json pattern validator
import jpv from 'jpv';
// or
// const jpv = require('jpv');


var json = {
  key1 : '98',
  key2 : {
      url : 'http://example.com'
  }
};

var pattern = {
  key1 : /[0-9]+/i,
  key2 : {
    url : "[url]" 
  }
}

if ( jsv.validate(json, pattern ) ){
    console.log('Valid')
}
else{
    console.log('Invalid')
}

// output is:  "Valid"

```

### Pattern Type

There are 5 types : **fixed**, **native**, **logical**, **regex** and **constructor** type.

#### Fixed

*Fixed Type* designed for validate json by exact values 
 
```javascript
    var pattern = {
      key1 : 98,
      key2 : {
          key3 : {
              status : "OK"
          }
      }
    }
```
> When is used fixed values, their types must be identical as well.

```javascript
    var json = {
      key : 98
    };

    // 1 pattern
    var pattern1 = {
      key : 98
    };

    // 2 pattern
    var pattern2 = {
      key : "98"
    };
    
    console.log( jpv.validate(json, pattern1) ) // --> true
    console.log( jpv.validate(json, pattern2) ) // --> false, types are different  

```

#### Native Type

*Native Type* is useing to validate json object by javascript native types : **boolean**,**null**,**undefined**,**number**,**string**,**symbol** and **object**.

*Native type* pattern is ```(type)```
 
```javascript
    var json = {
      key1 : 98,
      key2 : false,
      key3 : null
    };
    
    var pattern = {
      key1 : '(number)',
      key2 : '(boolean)',
      key3 : '(null)'
    };

    console.log( jpv.validate(json, pattern) ) // --> true
```

#### Logical Type

*Logical Type* involved to define most useful patterns. Using this pattern is pretty easy.

*Logical type* pattern is ```[type]```
 
```javascript
    var json = {
      key1 : '2017-12-25',
      key2 : 'user@gmail.com',
      key3 : []
    };
    
    var pattern = {
      key1 : '[date]',
      key2 : '[email]',
      key3 : '[empty]'
    };
    
    console.log( jpv.validate(json, pattern) ) // --> true
```

Available Logical Types:
 
| Logical Type  | Example                   |                   |
| --------------|:-------------------------:|------------------:|
| exist         |                           | is key exist      |
| empty         |                           | empty string      |
| boolean       | True                      | case-insensitive  | 
| double        | 12.258028                 | --                |
| naturalNumber | 2                         | 0 is not natural  |
| number        | 0284                      | --                |
| integer       | 1478                      | --                |
| url           | https://fb.com            | --                |
| alphaNumeric  | a7                        | --                |
| email         | user@example.com          | --                |
| date          | 2017-05-12                | --                |
| datetime      | 2017-03-25 10:30:58.235   | --                |


#### Regular Expression

This type is most common type, in fact *"Logical Type"* made by *"Regular Expression"*.

Use pure *regex* as a pattern. 

```javascript
    var json = {
      key : 'A-8'
    };
    
    var pattern = {
      key : '/[A-Z]-[0-9]/',
    };
    
    console.log( jpv.validate(json, pattern) ) // --> true
```

> when is used regex patterns before trying to match, every value is stringifying. Boolean true becomes string *"true"*, null becomes string *"null"* and etc.


#### Constructor

This type is especially created to validating Arrays. When constructors of object and pattern aren't primitive types or not objects, is compared their constructors.

```javascript
    var json = {
      key : [1,2,'5']
    };
    
    var pattern = {
      key : []
    };
    
    console.log( jpv.validate(json, pattern) ) // --> true
```

## Modes

There are two ```standard``` and ```strict``` modes.

In standard mode "pattern" object can miss properties, but in strict mode validation object and pattern must have the same "key-value" hierarchy.
 
```javascript
    
    var json = {
      key1 : 5789,
      key2 : "Another One"
    };
    
    var pattern = {
      key1 : '[number]'
    };
    
    // standard mode
    console.log(  jpv.validate(json, pattern)  )        // --> true
    
    // strict mode
    console.log(  jpv.validate(json, pattern, true ) )  // --> false
    
    var pattern = {
      key1 : '[number]',
      key2 : '[string]'
    };
    
    // strict mode
    console.log(  jpv.validate(json, pattern, true ) )  // --> true 
    
```


## Not / Logical negation (!) / Operator

Negations ("!") operator is used for *native* and *logical* types.
 
```javascript
    
    // Example 1
    var json = {
      key : 5789
    };
    
    var pattern = {
      key : '!(number)'
    };
    
    console.log(  jpv.validate(json, pattern)  )    // --> false

    // Example 2
    var json = {
      key1 : [2],
      key2 : "Yes",
      key3 : [2,3]
    };
    
    var pattern = {
      key1 : '!(number)',
      key2 : '!(number)',
      key3 : '![empty]'
    };

    // strict mode
    console.log(  jpv.validate(json, pattern) )     // --> true


    // Example 2
    var json = {
      key : {}
    };
    
    var pattern = {
      key : '![number]'
    };
    
    console.log(  jpv.validate(json, pattern)  )    // --> true

```

## Empty or Match (?) Operator

Current operator ("!") also used with *native* and *logical* types. This operator is used when given value can be empty along with some pattern. It works like a regex *?* operator.
 
```javascript
    
    var json1 = {
    };
    var json2 = {
      key : 5
    };
    var json3 = {
      key : ""
    };
    var json4 = {
      key : "A"
    };
    
    var pattern = {
      key : '[number]?'
    };
    
    console.log(  jpv.validate(json1, pattern)  )    // --> true
    console.log(  jpv.validate(json2, pattern)  )    // --> true
    console.log(  jpv.validate(json3, pattern)  )    // --> true
    console.log(  jpv.validate(json4, pattern)  )    // --> false

```

## Multiple Validation 

In case when need to validate types and values together, just need to use two separate patterns.
 
```javascript
    
    var json = {
      key : 5789
    };
    
    var patternForTypes = {
      key : '(number)'
    };
    
    var patterForValue = {
      key : /[0-9]{3}/
    };
    
    console.log(  jpv.validate(json, patternForTypes) && jpv.validate(json, patterForValue) ) // --> false

```


### Testing


```
sudo apt install node-tap
sudo npm install tap
tap test/*.js
```
