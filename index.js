/*!
 * accepts
 * Copyright(c) 2018 Manvel Khnkoyan
 * MIT Licensed
 */

'use strict'

/*
 * Static Types created by Regular Expression
 */
var expressions = require('./expressions.js')

// there couldn't be undefined or null pattern
var compareCommon = ( value , pattern ) => {

  // pattern = regex
  if( pattern instanceof RegExp ){
    return String(value).match(pattern)
  }

  // pattern = string
  if( (typeof pattern === 'string') ){

    // Native Types 
    let nativeMatches = pattern.match(/^(\!)?\((.*)\)(\?)?$/i)
    if( nativeMatches !== null ){
      let match = (value === null ? nativeMatches[2] === 'null' : (typeof value === nativeMatches[2]) )
      // Negation ? Operator
      if( typeof nativeMatches[3] !== 'undefined' ){
        if ( value === null || typeof value === 'undefined' || value === '' ){
          return true
        }
      }
      return nativeMatches[1] === '!' ? !match : match
    }
  
    // Logical Types
    let logicalMatches = pattern.match(/^(\!)?\[(.*)\](\?)?$/i)
    if( logicalMatches !== null && (logicalMatches[2] in expressions) ){
      let match = (String(value).match(expressions[logicalMatches[2]]) !== null)
      // Negation ? Operator
      if( typeof logicalMatches[3] !== 'undefined' ){
        if ( value === null || typeof value === 'undefined' || value === '' ){
          return true
        }
      }
      return logicalMatches[1] === '!' ? !match : match
    }

    // Functional Regex
    let functionalRegexMatches = pattern.match(/^(\!)?\{\/(.*)\/([a-z]*)\}(\?)?$/i)
    if( functionalRegexMatches !== null ){      
      let match = (String(value).match(new RegExp(functionalRegexMatches[2],functionalRegexMatches[3])) !== null)
      // Negation ? Operator
      if( typeof functionalRegexMatches[4] !== 'undefined' ){
        if ( value === null || typeof value === 'undefined' || value === '' ){
          return true
        }
      }
      return functionalRegexMatches[1] === '!' ? !match : match
    }

    // Functional Fixed
    let functionalFixedMatches = pattern.match(/^(\!)?\{(.*)\}(\?)?$/i)    
    if( functionalFixedMatches !== null ){
      let match =  ( String(value) == String(functionalFixedMatches[2]))
      // Negation ? Operator
      if( typeof functionalFixedMatches[3] !== 'undefined' ){
        if ( value === null || typeof value === 'undefined' || value === '' ){
          return true
        }
      }
      return functionalFixedMatches[1] === '!' ? !match : match
    }

    // Fixed Type
    return value === pattern
  }

  // pattern = number | boolean | symbol 
  if( (typeof pattern === 'number') || (typeof pattern === 'symbol') || (typeof pattern === 'boolean') ){
    return pattern === value
  }

  // pattern = object
  if( typeof pattern === 'object' ){

    if( typeof pattern !== typeof value ){
      return false
    }

    if( pattern !== null && value !== null  ){
      return value.constructor.name === pattern.constructor.name
    }

    return value === pattern
  }
    
  throw 'error: don`t use '+ (typeof pattern) +' as a pattern value, insted of it use string format'

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
  // when no object for pattern
  if( typeof obj2 === 'undefined'  ){
    if( typeof obj1 === 'string' ){
      if( (obj1.match( /^(\!)?\[(.*)\]\?$/i ) !== null) || 
          (obj1.match( /^(\!)?\((.*)\)\?$/i ) !== null) ||
          (obj1.match( /^(\!)?\{(\/.*\/[a-z]*)\}\?$/i ) !== null) ||
          (obj1.match( /^(\!)?\{(.*)\}\?$/i ) !== null)  ){        
        return true
      }
    }
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

      // case with null or undefined
      if( obj1[property] === null || obj2[property] === null || typeof obj1[property] === 'undefined' || typeof obj2[property] === 'undefined' ){        
        if( !(valid = cb( obj1[property], obj2[property])) ){
          return false
        }
      }

      // iterate if pattern is a array
      else if ( (obj2[property].constructor === Array) && (obj2[property].length > 0) ) {

        if( obj1[property].constructor !== Array ){
          if( !(valid = cb( obj1[property], obj2[property] ))){
            return false;
          }
          continue;
        }

        for(let i = 0; i < obj1[property].length; i++  ){
          if( !(valid = iterate(obj1[property][i], obj2[property][0], valid, cb ) ) ){
            return false
          }
        }

      }

      // iterate recursavely when object and json are objects / and when pattern has other keys
      else if ( (obj1[property].constructor === Object) && (obj2[property].constructor === Object) && (Object.keys(obj2[property]).length !== 0) ) {
        if( !(valid = iterate(obj1[property], obj2[property], valid, cb ) ) ){
          return false
        }
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
  return iterate(json, pattern, true, compareStandart ) && iterate( pattern, json , true, compareExistance )
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
