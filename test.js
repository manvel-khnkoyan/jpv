

var jpv = require('./index.js')


  // Example 2
  var json = {
    key1 : [2],
    key2 : "Yes",
    key3 : [2,3],
    key4 : "No",
    key5 : "3"
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
  