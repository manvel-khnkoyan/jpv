
jpv
==========

Json Pattern Validator.

***jpv***  - designed for validating json schemas.

## Install

Stable Release (`1.4.x`)

```sh
$ npm install jpv --save
```

## Usage

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
}

var pattern = {
  key1 : /[0-9]+/i,
  key2 : {
    url : "[url]" 
  }
}

console.log( 'valid: ', jpv.validate(json, pattern ) )
// --> "valid: true"

```

> validate() method returns boolean (true/false) 

## Pattern Types

There are many ptternt types : **Fixed**, **Native**, **Logical**, **Regex**, **Static**, **FunctionalRegex**, **FunctionalFixed** and **Constructor** type.

#### Fixed

*Fixed Type* designed for validate json by exact values 

```javascript
  var pattern = {
    key1 : 100,
    key2 : {
      key3 : {
        status : "OK"
      }
    }
  }
```

> When is used fixed values, types must be identical as well.

```javascript

  var json = {
    key : 100
  }

  // 1 pattern
  var pattern1 = {
    key : 100
  }

  // 2 pattern
  var pattern2 = {
    key : "100"
  }
  
  console.log( jpv.validate(json, pattern1) ) 
  // --> true
  
  console.log( jpv.validate(json, pattern2) ) 
  // --> false, types are different  

```

#### Native Type ```(type)```

*Native Type* is used for validate json through javascript native types : **boolean**,**null**,**undefined**,**number**,**string**,**symbol** and **object**.

 
```javascript

  var json = {
    key1 : 98,
    key2 : false,
    key3 : null
  }
  
  var pattern = {
    key1 : '(number)',
    key2 : '(boolean)',
    key3 : '(null)'
  }

  console.log( jpv.validate(json, pattern) ) 
  // --> true
```

#### Logical Type ```[type]```

*Logical Type* is made to define most useful patterns such as a email, date and etc.
 
```javascript

  var json = {
    key1 : '2017-12-25',
    key2 : 'user@gmail.com',
    key3 : []
  }
  
  var pattern = {
    key1 : '[date]',
    key2 : '[email]',
    key3 : '[empty]'
  }
  
  console.log( jpv.validate(json, pattern) ) 
  // --> true
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

```javascript

  var json = {
    key : 'A-8'
  }
  
  var pattern = {
    key : /[A-Z]-[0-9]/
  }
  
  console.log( jpv.validate(json, pattern) ) 
  // --> true
```

####  Functional Regex Type {regex}

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

####  Functional Fixed Type {fixed_value}

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


> before matching through regex, every type is converting to string. Boolean **true** becomes string **"true"**, null becomes string **"null"** and etc.


#### Constructor

This type is useful to validate Arrays and Objects. When pattern key is an object instead of primitive types, then comparison goes by object contructor.

```javascript

  var json = {
    key1 : [1,2,3],
    key2 : { a : 'b' }
  }
  
  var pattern = {
    key1 : [],
    key2 : {}
  }
  
  console.log( jpv.validate(json, pattern) ) 
  // --> true
```

another example:

```javascript
   
  var json = {
    key : [1,2,3]
  }

  var pattern = {
    key : [4]
  }
  
  console.log( jpv.validate(json, pattern) ) 
  // --> true

  // because in pattern when is used object - compares constructors, not values 
  // [1,2,3].constructor === [4].constructor

```

## Modes

There are two ```standard``` and ```strict``` modes.

In standard mode "pattern" can miss properties or even can be empty, but in strict mode validation object and pattern must have the same "key-value" hierarchy.
 
```javascript
    
  var json = {
    key1 : 5789,
    key2 : "Another One"
  }

  var pattern = {
    key1 : '[number]'
  }
  
  // standard mode
  console.log(  jpv.validate(json, pattern)  )        
  // --> true
  
  // strict mode
  console.log(  jpv.validate(json, pattern, true ) )  
  // --> false  
```

```javascript
  var pattern = {
    key1 : '[number]',
    key2 : '[string]'
  }
  
  // strict mode
  console.log(  jpv.validate(json, pattern, true ) )  
  // --> true 
```

## Not / Logical negation (!) / Operator

Negations ("!") operator is used for only *Native*, *Logical* and *Functional Types* types.

```javascript
    
  // Example 1
  var json = {
    key : 5789
  }
  
  var pattern = {
    key : '!(number)'
  }
  
  console.log( jpv.validate(json, pattern) )
  // --> false
```

```javascript
   
  // Example 2
  var json = {
    key1 : [2],
    key2 : "Yes",
    key3 : [2,3],
    key4 : "No",
    key5 : "1"
  }
  
  var pattern = {
    key1 : '!(number)',
    key2 : '!(number)',
    key3 : '![empty]',
    key4 : '!{/Yes/i}',
    key5 : '!{2}'
  }

  // strict mode
  console.log(  jpv.validate(json, pattern) )
  // --> true
```

```javascript

  // Example 3
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

This operator is used when given value is allowed to be empty as well. It works like a regex **?** operator.

Current operator ("!") is used for only with *Native* and *Logical* types. 
 
```javascript
    
  var json1 = {
  }
  var json2 = {
    key : 5
  }
  var json3 = {
    key : ""
  }
  var json4 = {
    key : "A"
  }
  
  var pattern = {
    key : '[number]?'
  }
  
  console.log( jpv.validate(json1, pattern) )
  // --> true
  
  console.log( jpv.validate(json2, pattern) )
  // --> true
  
  console.log( jpv.validate(json3, pattern) )
  // --> true
  
  console.log( jpv.validate(json4, pattern) )
  // --> false

```

Another example with *Functional Type*


```javascript
    
  var json1 = {

  }
  var json2 = {
    key : '1'
  }
  var json3 = {
    key : 'a'
  }
  
  var pattern = {
    key : '{/^[0-9]$/}?'
  }
  
  console.log( jpv.validate(json1, pattern) )
  // --> true
  
  console.log( jpv.validate(json2, pattern) )
  // --> true
  
  console.log( jpv.validate(json3, pattern) )
  // --> false

```


## Multiple Validation 

If need to validate multiple patterns, you have to use different patterns.
 
```javascript
    
  var json = {
    key : 5789
  }
  
  var patternForTypes = {
    key : '(number)'
  }
  
  var patterForValue = {
    key : /^[0-9]{3}$/
  }
  
  console.log(  
    jpv.validate(json, patternForTypes)  // --> true
      && 
    jpv.validate(json, patterForValue)   // --> false
  ) 
  // --> false

```


### Testing

```
sudo apt install node-tap
sudo npm install tap
tap test/*.js
```
