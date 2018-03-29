/*!
 * accepts
 * Copyright(c) 2018 Manvel Khnkoyan
 * MIT Licensed
 */

'use strict'

/*
 * Static Types created by Regular Expression
 */
var expressions = require('./expressions.js');

var compareCommon = ( value , pattern ) => {

  // by given regex
  if( pattern instanceof RegExp ){
    return String(value).match(pattern)
  }

  if(pattern === null){
    throw 'do not use null as a pattern value, insted of it use "(null)" or "!(null)" patterns'
  }

  // by static types
  let matches = pattern.match(/^(\!)?\((.*)\)(\?)?$/i)
  if( matches !== null ){
    let match = (value === null ? matches[2] === 'null' : (typeof value === matches[2]) );
    
    // for ? operator
    if( typeof matches[3] !== 'undefined' ){
      if ( value === null || typeof value === 'undefined' || value === '' ){
        return true
      }
    }

    return matches[1] === '!' ? !match : match;
  }

  // when pattern is a string
  if( typeof pattern === 'string'  ){
    
    // by dynamic types
    let matches = pattern.match(/^(\!)?\[(.*)\](\?)?$/i)
    if( matches !== null && (matches[2] in expressions) ){
      let match = String(value).match(expressions[matches[2]]) !== null;

      // for ? operator
      if( typeof matches[3] !== 'undefined' ){
        if ( value === null || typeof value === 'undefined' || value === '' ){
          return true
        }
      }

      return matches[1] === '!' ? !match : match;
    }

    // by exact values
    return String(value) == String(pattern)
  }

  // by constructor
  return value.constructor === pattern.constructor
  
}

var compareStandart = ( value , pattern ) => {
  // when pattern is undefined
  if( typeof pattern === 'undefined'  ){
    return true
  }
  return compareCommon( value , pattern )
}


var compareStrict = ( value , pattern ) => {
  // when pattern is undefined
  if( typeof pattern === 'undefined'  ){
    return false
  }
  return compareCommon( value , pattern )
}

var compareExistance = ( obj1, obj2 ) => {
  // when pattern is undefined
  if( typeof obj2 === 'undefined'  ){
    return false
  }
  return true
}


/*
* @param {Object} iteration object
* @param {Array} vector
* @param {Function} callback
*/
var iterate  = (obj1, obj2, valid, cb ) => {

  if ( !valid ) return false

  for (var property in obj1) {

    if (obj1.hasOwnProperty(property)) {
      
      // case with null
      if( obj1[property] === null || obj2[property] === null ){
        if( !(valid = cb( obj1[property], obj2[property])) ){
          return false
        }
      }

      // iterate recursavely 
      else if ( obj1[property].constructor === Object) {
        if ( obj2[property].constructor !== Object ) {
          if( !(valid = cb( obj1[property], obj2[property])) ){
            return false
          }
        }
        else{
          if( !(valid = iterate(obj1[property], obj2[property], valid, cb ) ) ){
            return false
          }
        }
      }
      
      // when pattern is object instead of simple type
      else if( (typeof obj2[property] !== 'undefined') && (obj2[property].constructor === Object) ) {
        return false
      }

      // 
      else {
        if( !(valid = cb( obj1[property], obj2[property])) ){
          return false
        }
      }

    }

  }

  return valid
}

var standartValidate = (json, pattern) => {
  return iterate(json, pattern, true, compareStandart ); // && iterate( pattern, json, true, compareExistance )
}

var strictValidate = (json, pattern) => {
  return iterate(json, pattern, true, compareStrict ) && iterate( pattern, json, true, compareExistance )
}

module.exports =  {

  validate : (json, pattern, strict ) => {
    
    // when strict is set
    if( strict !== null && strict === true ){
      return strictValidate(json, pattern)
    }

    return  standartValidate(json, pattern)
  }

}
