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

var compareStandart = ( value , pattern ) => {

  

  // when pattern is undefined
  if( typeof pattern === 'undefined'  ){
    return true
  }

  // by given regex
  if( pattern instanceof RegExp ){
    return String(value).match(pattern)
  }

  // by static types
  let matches = pattern.match(/^\((.*)\)$/i)
  if( matches !== null && (matches[1] in expressions) ){
    return typeof value === matches[1] 
  }

  // when pattern is a string
  if( typeof pattern === 'string'  ){
    
    // by dynamic types
    let matches = pattern.match(/^\[(.*)\]$/i)
    if( matches !== null && (matches[1] in expressions) ){
      return String(value).match(expressions[matches[1]])
    }

    // by exact values
    return String(value) == String(pattern)
  }

  // by constructor
  return value.constructor === pattern.constructor
  
}


var compareStrict = ( value , pattern ) => {

  // when pattern is undefined
  if( typeof pattern === 'undefined'  ){
    return false
  }

  // by given regex
  if( pattern instanceof RegExp ){
    return String(value).match(pattern)
  }

  // by static types
  let matches = pattern.match(/^\((.*)\)$/i)
  if( matches !== null && (matches[1] in expressions) ){
    return typeof value === matches[1] 
  }

  // when pattern is a string
  if( typeof pattern === 'string'  ){
    
    // by static types
    let matches = pattern.match(/^\[(.*)\]$/i)
    if( matches !== null && (matches[1] in expressions) ){
      return String(value).match(expressions[matches[1]])
    }

    // by exact values
    return value === pattern
  }

  // by constructor
  return value.constructor === pattern.constructor
  
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

      // iterate recursavely 
      if ( obj1[property].constructor === Object) {
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
  return iterate(json, pattern, true, compareStandart ) && iterate( pattern, json, true, compareExistance )
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
