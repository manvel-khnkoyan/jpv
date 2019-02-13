/*!
 * Copyright(c) 2018 Manvel Khnkoyan
 * MIT Licensed
 */

module.exports =  {

  /*
  * Given anything except empty string, false, null or undefined
  * */
  exist : /.*/,

  /*
  * is empty string, false, null or undefined
  * */
  empty : /^$/,

  /*
  * is boolean
  * */
  boolean : /^(true|false)$/i,

  /*
  * is double
  * */
  double : /^-?\d*(\.\d+)?$/,

  /*
  * is float
  * */
  float : /^-?\d*(\.\d+)?$/,

  /*
  * is natural number
  * */
  naturalNumber : /^[1-9][0-9]*$/,

  /*
  * is integer eater plus or minus
  * */
  number : /^[0-9]+$/i,

  /*
  * is integers
  * */
  integer : /^\d+$/,

  /*
  * is URL
  * */
  url : /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i,

  /*
  *
  * */
  alphaNumeric : /^([a-zA-Z0-9_])+$/i,

  /*
  *
  * */
  email : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,

  /*
  * is date, ex.: 2019-02-13
  * */
  date : /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,

  /*
  * is ISO datetime, ex.: 2012-12-12T00:00:00Z
  * */
  datetime : /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/

};
