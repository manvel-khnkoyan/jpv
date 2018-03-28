
jpv
==========

Json Pattern Validator.

****jpv*** designed for validating json schemas using json pattern

## Install

Release (`1.1.x`)

```sh
$ npm install jpv --save
```

## Usage

Create pattern like a verifiable object, then use ``` validate ``` method to validate. 

> validate() method returns a boolean (true/false) 

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


### Pattern Types

There are 5 types : **fixed**, **native**, **logical**, **regex** and last type is **constructor** type.

##### Fixed

Fixed type is useful when is checking exact values 
 
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

##### Native Types

Native Types used to validate bay javascript native types : **boolean**,**null**,**undefined**,**number**,**string**,**symbol** and **object**.

Native types patterns is ```(type)```
 
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

##### Logical Types

Logical Types involved to define most usefull patterns, and make a usage easier

Native types patterns is ```[type]```
 
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

Available logical types:
 
| Logical Type  | Example                   |                   |
| --------------|:-------------------------:|------------------:|
| exist         |                           | is key exist      |
| empty         |                           | empty string      |
| boolean       | True                      | case insensitive  | 
| double        | 12.258028                 | --                |
| naturalNumber | 2                         | 0 is not natural  |
| number        | 0284                      | --                |
| integer       | 1478                      | --                |
| url           | https://fb.com            | --                |
| alphaNumeric  | a7                        | --                |
| email         | user@example.com          | --                |
| date          | 2017-05-12                | --                |
| datetime      | 2017-03-25 10:30:58.235   | --                |


##### Regular Expression

This type is most common type, in fact *"Logical Types"* made by *"Regular Expression"* type.

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

> when is used regex patterns befor trying to match, every value is stringifying. Bollean true becomes string *"true"*, null becomes string *"null"* and etc.


```javascript    
    var pattern = {
      isThisKeySet : '/.*/',
    };

    // or
    var pattern = {
      isThisKeySet : '[set]',
    };

```


##### Constructor

This type is especially created to validating Arrays. When constructors of object and pattern aren't primitive types no not an objects, is compared their constructors.

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
When is used standard mode then validation object can include other keys too, but in strict mode validation object and pattern  must have the same "key-value" hierarchy.
 
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

jpv also allows you to use negations ("!") for *native* and *logical* types
 
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

## Multiple Valifdation 

For example when need to validate types and then values, need to do it twice and create aparted patterns.
 
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
