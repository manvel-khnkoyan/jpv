
var tap = require('tap')
var jpv = require('../index.js')

var json = {
    key1 : 78,
    key2 : {
        url : "http://example.com"
    },
    key3 : "17850",
    key4 : "OK",
    key5 : "2012-10-06T04:13:00+00:00"
};

var pattern = {
    key1 : "(number)",
    key2 : {
        url : "[url]"
    },
    key3 : /[0-9]+/i,
    key4 : "OK",
    key5 : '[datetime]'
}

tap.test('jpv.validate', function (t) {    
    t.ok( jpv.validate(json, pattern, true), "Validate json Pattern" )
    t.end()
});
