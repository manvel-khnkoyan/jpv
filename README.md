
jpv
==========

#####Json Pattern Validator.

****jpv*** designed for validating json format, using variety structures* 

## Install

Release (`1.x`)

```sh
$ npm install jpv --save
```

## Usage

Just build pattern like a validation object, then use command ``` validate ``` to validate json.

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

**jpv** allows you use 5 types - **fixed**, **standard**, **library**, **regex** and last type is **constructor** type.

##### Fixed

This type is used for fixed values. 
 
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

Pay attention, if you use fixed type, types must be the same  

```javascript
    var json = {
      key : 98
    };
    
    var pattern1 = {
      key : 98
    };
    
    var pattern2 = {
      key : '98'
    };
    
    console.log( jpv.validate(json, pattern1) ) // --> true
    console.log( jpv.validate(json, pattern2) ) // --> false, types are different  

```

##### Standard Types

This types is helpfull if you want to use javascript standard types **boolean**,**null**,**undefined**,**number**,**string**,**symbol**.

To use standard types in patterns need to use bracket ```(type)```

 
```javascript
    var json = {
      key1 : 98,
      key2 : false
    };
    
    var pattern = {
      key1 : '(number)',
      key2 : '(boolean)'
    };
    
    console.log( jpv.validate(json, pattern) ) // --> true
```

##### Library Types

To use library types in patterns need to use this format ```[type]```

 
```javascript
    var json = {
      key1 : '2017-12-25',
      key2 : 'user@gmail.com'
    };
    
    var pattern = {
      key1 : '[date]',
      key2 : '[email]'
    };
    
    console.log( jpv.validate(json, pattern) ) // --> true
```

Below list of library types:
 
| library type  | example                   |                   |
| --------------|:-------------------------:|------------------:|
| boolean       | True                      | case insensitive  | 
| string        | any string                | --                |
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

This type is mostly used for your need, actually *"Library Types"* are also "Regular Expression" tyep defined in library.

Using this type is simple: 

 
```javascript
    var json = {
      key : 'A-3'
    };
    
    var pattern = {
      key : '/[A-Z]-[0-9]/',
    };
    
    console.log( jpv.validate(json, pattern) ) // --> true
```

note that before trying to match, library is converting value to string


##### Constructor

This type is intended for validating arrays. In case when you want to validate array, simplest way to do it just compare object`s constructors

```javascript
    var json = {
      key : [1,2,'5']
    };
    
    var pattern = {
      key : []
    };
    
    console.log( jpv.validate(json, pattern) ) // --> true
```


---

Note*, if you want to validate objects or array or you want to validate both of types and valuse you have to use multiple patterns :
 
 
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
 

## Modes

There are two ```standard``` and ```strict``` modes to use.
When is used standard mode then validation object can include other keys too, but in strict mode validation object and pattern json structure must be the same: 

 
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


### Testing


```
sudo apt install node-tap
sudo npm install --g tap
tap test/*.js
```
