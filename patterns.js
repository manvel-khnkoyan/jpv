/*!
 * Copyright(c) 2018 Manvel Khnkoyan
 * MIT Licensed
 */

module.exports = [

    /* deprecated */
    {
        pattern: 'exist',
        onMatch: (value, match) => value.match(/.*/)
    },
    {
        pattern: 'boolean',
        onMatch: (value, match) => value.match(/^(true|false)$/i)
    },

    /*  */
    {
        pattern: 'empty',
        onMatch: (value, match) => value.match(/^$/)
    },
    {
        pattern: 'double',
        onMatch: (value, match) => value.match(/^-?\d*(\.\d+)?$/)
    },
    {
        pattern: 'float',
        onMatch: (value, match) => value.match(/^-?\d*(\.\d+)?$/)
    },
    {
        pattern: 'naturalNumber',
        onMatch: (value, match) => value.match(/^[1-9][0-9]*$/)
    },
    {
        pattern: 'number',
        onMatch: (value, match) => value.match(/^[0-9]+$/i)
    },
    {
        pattern: 'integer',
        onMatch: (value, match) => value.match(/^\d+$/)
    },
    {
        pattern: 'url',
        onMatch: (value, match) => value.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/i)
    },
    {
        pattern: 'alphaNumeric',
        onMatch: (value, match) => value.match(/^([a-zA-Z0-9_])+$/i)
    },
    {
        pattern: 'email',
        onMatch: (value, match) => value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    },
    {
        pattern: 'date',
        onMatch: (value, match) => value.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/)
    },
    {
        pattern: 'datetime',
        onMatch: (value, match) => value.match(/^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/)
    },
    {
        pattern: 'length\\(([0-9]+)\\)',
        flag: 'u',
        onMatch: (value, match) => value.length === parseInt(match[1])
    },
    {
        pattern: 'min-length\\(([0-9]+)\\)',
        flag: 'u',
        onMatch: (value, match) => value.length >= parseInt(match[1])
    },
    {
        pattern: 'max-length\\(([0-9]+)\\)',
        flag: 'u',
        onMatch: (value, match) => value.length <= parseInt(match[1])
    },
    {
        pattern: 'eq\\((-?\\d*(\\.\\d+)?)\\)',
        flag: 'u',
        onMatch: (value, match) => isNaN(value) ? false : parseFloat(value) === parseFloat(match[1])
    },
    {
        pattern: 'lt\\((-?\\d*(\\.\\d+)?)\\)',
        flag: 'u',
        onMatch: (value, match) => isNaN(value) ? false : parseFloat(value) < parseFloat(match[1])
    },
    {
        pattern: 'gt\\((-?\\d*(\\.\\d+)?)\\)',
        flag: 'u',
        onMatch: (value, match) => isNaN(value) ? false : parseFloat(value) > parseFloat(match[1])
    },
    {
        pattern: 'lte\\((-?\\d*(\\.\\d+)?)\\)',
        flag: 'u',
        onMatch: (value, match) => isNaN(value) ? false : parseFloat(value) <= parseFloat(match[1])
    },
    {
        pattern: 'gte\\((-?\\d*(\\.\\d+)?)\\)',
        flag: 'u',
        onMatch: (value, match) => isNaN(value) ? false : parseFloat(value) >= parseFloat(match[1])
    }
];
