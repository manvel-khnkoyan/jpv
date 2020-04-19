
const tap = require('tap');
const { validate, is, and, or, not } = require('../index.js');

const json = {
    exist: 'OK',
    empty: '',
    boolean: 'False',
    float: 1.25,
    double: '-1.25',
    naturalNumber: '1',
    number: '0255',
    integer: 9007199254740991,
    url: 'https://somedomain.domain.co/users/78025/?a=1#route=/yes/',
    alphaNumeric: '5de48',
    email: 'joona@foobar.fi',
    date: '2020-04-31',
    datetime: '2020-04-31T15:30:24',
    length: 'abcd',
    minLength: 'abcd',
    maxLength: 'abcde',
    eq: '50',
    lt: '50',
    gt: 50,
    lte: 20,
    gte: '20',
};

const validPattern1 = {
    exist: '[exist]',
    empty: '[empty]',
    boolean: '[boolean]',
    float: '[float]',
    double: '[double]',
    naturalNumber: '[naturalNumber]',
    number: '[number]',
    integer: '[integer]',
    alphaNumeric: '[alphaNumeric]',
    email: '[email]',
    date: '[date]',
    datetime: '[datetime]',
    length: '[length(4)]',
    minLength: '[min-length(4)]',
    maxLength: '[min-length(5)]',
    eq: '[eq(50)]',
    lt: '[lt(51)]',
    gt: '[gt(49)]',
    lte: '[lte(20)]',
    gte: '[gte(20)]'
};

const validPattern2 = {
    exist: is('exist'),
    empty: is('empty'),
    boolean: is('boolean'),
    float: is('float'),
    double: is('double'),
    naturalNumber: is('naturalNumber'),
    number: is('number'),
    integer: is('integer'),
    alphaNumeric: is('alphaNumeric'),
    email: is('email'),
    date: is('date'),
    datetime: is('datetime'),
    length: is('length(4)'),
    minLength: is('min-length(4)'),
    maxLength: is('min-length(5)'),
    eq: is('eq(50)'),
    lt: is('lt(51)'),
    gt: is('gt(49)'),
    lte: is('lte(20)'),
    gte: is('gte(20)')
};

const j1 = {exist: null};
const s1 = {exist: '![exist]'};
const o1 = {exist: not(is('exist'))};

const j2 = {empty: 'yes'};
const s2 = {empty: '[empty]'};
const o2 = {empty: is('empty')};

const j3 = {empty: [1,2]};
const s3 = {empty: '[empty]'};
const o3 = {empty: is('empty')};

const j4 = {empty: 'OK'};
const s4 = {empty: '[boolean]'};
const o4 = {empty: is('boolean')};

const j5 = {empty: 'OK'};
const s5 = {empty: '[float]'};
const o5 = {empty: is('float')};

const j6 = {empty: 'OK'};
const s6 = {empty: '[double]'};
const o6 = {empty: is('double')};

const j7 = {empty: '-5'};
const s7 = {empty: '[naturalNumber]'};
const o7 = {empty: is('naturalNumber')};

const j8 = {empty: '34a'};
const s8 = {empty: '[number]'};
const o8 = {empty: is('number')};

const j9 = {empty: 1.5};
const s9 = {empty: '[integer]'};
const o9 = {empty: is('integer')};

const j10 = {empty: 'https://somedomain'};
const s10 = {empty: '[url]'};
const o10 = {empty: is('url')};

const j11 = {empty: 'root@dom.c'};
const s11 = {empty: '[email]'};
const o11 = {empty: is('email')};

const j12 = {empty: '2018'};
const s12 = {empty: '[date]'};
const o12 = {empty: is('date')};

const j13 = {empty: '2018-12-05:40'};
const s13 = {empty: '[datetime]'};
const o13 = {empty: is('datetime')};

const j14 = {empty: 'abc'};
const s14 = {empty: '[length(4)]'};
const o14 = {empty: is('length(4)')};

const j15 = {empty: 'abc'};
const s15 = {empty: '[min-length(4)]'};
const o15 = {empty: is('min-length(4)')};

const j16 = {empty: 'abc'};
const s16 = {empty: '[max-length(2)]'};
const o16 = {empty: is('max-length(2)')};

const j17 = {empty: null};
const s17 = {empty: '[eq(2)]'};
const o17 = {empty: is('eq(2)')};

const j18 = {empty: 'abc'};
const s18 = {empty: '[lt(2)]'};
const o18 = {empty: is('lt(2)')};

const j19 = {empty: 0};
const s19 = {empty: '[gt(2)]'};
const o19 = {empty: is('gt(2)')};

const j20 = {empty:  15};
const s20 = {empty: '[lte(10)]'};
const o20 = {empty: is('lte(10)')};

const j21 = {empty: '50'};
const s21 = {empty: '[gte(51)]'};
const o21 = {empty: is('gte(51)')};


// Valid Case
tap.test('Patterns', function (t) {
    t.ok(validate(json, validPattern1, { debug: true }), 'Valid case with short tags');
    t.ok(validate(json, validPattern2, { debug: true }), 'Valid case with operators');

    t.ok(!validate(j1, s1, { debug: true }), 'Invalid exist with short tags');
    t.ok(!validate(j1, o1, { debug: true }), 'Invalid exist with operators');

    t.ok(!validate(j2, s2, { debug: true }), 'Invalid empty with short tags');
    t.ok(!validate(j2, o2, { debug: true }), 'Invalid empty with operators');

    t.ok(!validate(j3, s3, { debug: true }), 'Invalid empty array with short tags');
    t.ok(!validate(j3, o3, { debug: true }), 'Invalid empty array with operators');

    t.ok(!validate(j4, s4, { debug: true }), 'Invalid boolean with short tags');
    t.ok(!validate(j4, o4, { debug: true }), 'Invalid boolean with operators');

    t.ok(!validate(j5, s5, { debug: true }), 'Invalid float with short tags');
    t.ok(!validate(j5, o5, { debug: true }), 'Invalid float with operators');

    t.ok(!validate(j6, s6, { debug: true }), 'Invalid double with short tags');
    t.ok(!validate(j6, o6, { debug: true }), 'Invalid double with operators');

    t.ok(!validate(j7, s7, { debug: true }), 'Invalid naturalNumber with short tags');
    t.ok(!validate(j7, o7, { debug: true }), 'Invalid naturalNumber with operators');

    t.ok(!validate(j8, s8, { debug: true }), 'Invalid number with short tags');
    t.ok(!validate(j8, o8, { debug: true }), 'Invalid number with operators');

    t.ok(!validate(j9, s9, { debug: true }), 'Invalid integer with short tags');
    t.ok(!validate(j9, o9, { debug: true }), 'Invalid integer with operators');

    t.ok(!validate(j10, s10, { debug: true }), 'Invalid url with short tags');
    t.ok(!validate(j10, o10, { debug: true }), 'Invalid url with operators');

    t.ok(!validate(j11, s11, { debug: true }), 'Invalid email with short tags');
    t.ok(!validate(j11, o11, { debug: true }), 'Invalid email with operators');

    t.ok(!validate(j12, s12, { debug: true }), 'Invalid date with short tags');
    t.ok(!validate(j12, o12, { debug: true }), 'Invalid date with operators');

    t.ok(!validate(j13, s13, { debug: true }), 'Invalid datetime array with short tags');
    t.ok(!validate(j13, o13, { debug: true }), 'Invalid datetime array with operators');

    t.ok(!validate(j14, s14, { debug: true }), 'Invalid length with short tags');
    t.ok(!validate(j14, o14, { debug: true }), 'Invalid length with operators');

    t.ok(!validate(j15, s15, { debug: true }), 'Invalid min-length with short tags');
    t.ok(!validate(j15, o15, { debug: true }), 'Invalid min-length with operators');

    t.ok(!validate(j16, s16, { debug: true }), 'Invalid max-length with short tags');
    t.ok(!validate(j16, o16, { debug: true }), 'Invalid max-length with operators');

    t.ok(!validate(j17, s17, { debug: true }), 'Invalid eq with short tags');
    t.ok(!validate(j17, o17, { debug: true }), 'Invalid eq with operators');

    t.ok(!validate(j18, s18, { debug: true }), 'Invalid lt with short tags');
    t.ok(!validate(j18, o18, { debug: true }), 'Invalid lt with operators');

    t.ok(!validate(j19, s19, { debug: true }), 'Invalid gt with short tags');
    t.ok(!validate(j19, o19, { debug: true }), 'Invalid gt with operators');

    t.ok(!validate(j20, s20, { debug: true }), 'Invalid lte with short tags');
    t.ok(!validate(j20, o20, { debug: true }), 'Invalid lte with operators');

    t.ok(!validate(j21, s21, { debug: true }), 'Invalid gte with short tags');
    t.ok(!validate(j21, o21, { debug: true }), 'Invalid gte with operators');

    t.end();
});
