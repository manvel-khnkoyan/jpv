
jpv
==========

Json Pattern Validator.

***jpv***  - it is an easy-to-use JSON schema validator library for large and complex data.

Validating a JSON object by comparing it with a pattern object, passing through all the nodes of the pattern using constious simple validation methods.

#### Main concept

Verification comes with the **jpv.validate** function

```javascript
jpv.validate(
  json, // --> The JSON Object you want to validate
  pattern // --> The pattern object using the same structure as JSON with the validation patterns.
)
```
> The function returns only true or false


A simple use case: 

```javascript
import jpv from 'jpv';

const json = {
  status : 'OK',
  data : {
    url : 'http://example.com'
  }
}

const pattern = {
  status : /^OK$/,
  data : {
    url : "[url]"
  }
}
    
jpv.validate(json, pattern ) 
// -> true
```


#### Install

Stable Release (`2.2.x`)

```sh
$ npm install jpv --save
```
or

```sh
$ yarn add jpv
```


#### Regular expression

```javascript
const json = {
  key : 'A-8',
  value: 18
}

const pattern = {
  key : /^[A-Z]-[0-9]$/,
  value: new RegExp(/\d/)
}

jpv.validate(json, pattern)  
// --> true
```

Pay attention to the type of regular expression, it should not be a string.

```javascript
const pattern = {
  key1 : /^[A-Z]+$/,   // -> Right regular expression 
  key2 : '/^[A-Z]+$/'  // -> Wrong regular expression
}
```

#### Native Types 

The case when you need to validate by object native type - can be done by


using a brackets short tags.

```javascript
{
    key: '(NATIVE-TYPE)'
}
```

or using "typeOf" operator

```javascript
{
    key: jpv.typeOf('NATIVE-TYPE')
}
```

Here is an example:

```javascript
  const json = {
    key1: 98,
    key2: false,
    key3: true,
    key4: null,
    key5: []
  }

  const pattern = {
    key1: '(number)',
    key2: '(boolean)',
    key3: jpv.typeOf('boolean'),
    key4: '(object)', // typeof null === 'object'
    key5: '(object)',
    key6: '(undefined)'
  }

  jpv.validate(json, pattern) 
  // --> true
```

#### Patterns

The library provides the ability to check using the declared patterns for most popular types, such as email, URL, date, etc.

There are two way of using patterns - 

short tags 

```javascript
{
    key: '[email]'
}
```

and "is" operator:

```javascript
{
    key: jpv.is('email')
}
```


More examples:

```javascript
  const json = {
    a: '2017-12-25',
    b: 'user@gmail.com',
    c: [],
    d: 'some text'
  }

  const pattern = {
    a: '[date]',
    b: '[email]',
    c: '[empty]',
    d: '[min-length(9)]',
  }
  
  // or 
  const pattern2 = {
    a: jpv.is('date]'),
    b: jpv.is('email'),
    c: jpv.is('empty'),
    d: jpv.is('min-length(9)')
   }

  jpv.validate(json, pattern)  
  // --> true
```

Available defined patterns:

| Pattern                         | Valid example             |  Descriptiom                       |
| --------------------------------|:-------------------------:|:-----------------------------------|
| empty                           | []                        | Stringifying and comparing         |
| double                          | 12.258028                 |                                    |
| naturalNumber                   | 2                         |                                    |
| number                          | 0284                      | any digital numbers                |
| integer                         | 1478                      |                                    |
| url                             | https://fb.com            |                                    |
| alphaNumeric                    | a7                        |                                    |
| email                           | user@example.com          |                                    |
| date                            | 2017-05-12                |                                    |
| datetime                        | 2017-03-25 10:30:58.235   |                                    |
| length(3)                       | abc                       | string length                      |
| min-length(4)                   | abcd                      | string min length                  |
| max-length(4)                   | abcde                     | string max length                  |
| eq(15)                          | 15                        | equal the number                   |
| lt(17)                          | 16                        | less then                          |
| gt(18)                          | 19                        | greater then                       |
| lte(17)                         | 17                        | less then or equal                 |
| gte(18)                         | 18                        | greater then or equal              |



---
---  


  
  
#### "and", "or", "not" operators

JPV allows you to use the most fundamental operators “or”, “and”, “not”, as we do in almost every programming language.


```javascript
  const json = {
    key: 150
  }

  const pattern1 = {
    key: jpv.and('[eq(150)]', '(number)') 
  }

  const pattern2 = {
    key: jpv.and('[eq(150)]', '(string)') 
  }


  jpv.validate(json, pattern1)
  // --> true  
  jpv.validate(json, pattern2)  
  // --> false
```

_“or”_ and _“and”_ operators patternas are set by list of arguments:

```javascript
jpv.or(patern1, patern2, ... .)
jpv.and(patern1, patern2, ... .)
```

Also they can be mixed:

```javascript
jpv.and(patern1, patern2, jpv.or(patern3, patern4, ... .), ... .)
```

Not operator receive only one pattern

```javascript
jpv.not(pattern)
```

Using these operators we can write big and complex conditions like:


```javascript
  const {and, or, not} = jpv;
  
  const jpvEmailOrPhone = or(
    and('[email]', not('bot@example.com')),
    and('[number]', '[length(10)]')
  );  

  const json = {
     key1: 'example@gmal.com',
     key2: '1234567890'
  }

  const pattern = {
    key1: jpvEmailOrPhone,
    key2: jpvEmailOrPhone
  }

  jpv.validate(json, pattern)
  // -> true
  
```
  

#### Functional

This is the future specifically for custom validation patterns. 
Patterns with functions will be called any time when validating:

```javascript
  const json = {
     name: "Mister Albert"
  }

  const pattern = {
    name: (name) => name.split(' ').length > 1
  }

  jpv.validate(json, pattern)
  // - true

``` 

#### Modes

There are two ```standard``` and ```strict``` modes.

```strict``` mode is used when your pattern and given JSON should contain exact fields,
while in ```standard``` mode JSON can contain more fields than described in the pattern.

By default JPV validator used standard mode. To set up strict mode - need add 3th argument into the ```jpv.validate``` function:

```javascript
  const options = { mode: "strict" };

  // strict mode
  jpv.validate(json, pattern, options );
```

Example of usage strict and standard modes

```javascript
  const json = {
    a: 5789,
    b: "Another One"
  }

  const pattern1 = {
    a: '(number)'
  }
 
  const pattern2 = {
    a: '(number)',
    b: '(string)'
  }


  // standard mode
  console.log(  jpv.validate(json, pattern1)  )
  // --> true

  // strict mode
  console.log(  jpv.validate(json, pattern1, { mode : "strict" } ) )
  // --> false
  // missing b

```


#### Arrays

To validate nested arrays elements all you need is to create **one** nested pattern inside an array.
Each array element will be validated according to the first element of the pattern.

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
        id: '(number)',
        name: '(string)'
      }
    ]
  }

  console.log( jpv.validate(json, pattern) )
  // --> true
```

#### Exact value

By exact value comparison - values must be of the same type:

```javascript
const json = { 
  index: 999
}

jpv.validate(json, {index: 999})
// -> true

jpv.validate(json, {index: '999'})
// -> false

jpv.validate(json, {index: '[eq(999)]'})
// -> true

``` 

In some cases, there is an operator that can be useful when the assigned value could look like the short tags patterns.
In this case use _"exact"_ operator:

```javascript
const json = { index: "[email]"}
const pattern = { index: jpv.exact("[number]") }
``` 

#### Debugging

The *jpv.validate*  function returns only a boolean type.
But if you want more information about errors, just turn on debugging mode ({debug: true}) in the third argument of function.

```javascript
const json = { index: "Yes"}
const pattern = { index: "[number]"};

// debug mode
jpv.validate(json, pattern, {debug : true})

// error - the value of: {"index" = yes} not matched with: "[number]"
```

#### TypeScript usage

```
import * as jpv from 'jpv';

jpv.validate(json, pattern, false);
```

#### Testing

```
sudo apt install node-tap
sudo npm install tap --dev
tap test/*.js
```
