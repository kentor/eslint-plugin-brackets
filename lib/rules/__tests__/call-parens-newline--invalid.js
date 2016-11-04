const rule = require('../call-parens-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('call-parens-newline', rule, {
  valid: [],
  invalid: withParserOptions([
    {
      code: [
        'foo(bar,',
        '    baz)',
      ].join('\n'),
      output: [
        'foo(',
        'bar,',
        '    baz',
        ')',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
        { message: 'Expected line break before this paren' },
      ],
    },
    {
      code: [
        'foo(bar,',
        '    baz,)',
      ].join('\n'),
      output: [
        'foo(',
        'bar,',
        '    baz,',
        ')',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
        { message: 'Expected line break before this paren' },
      ],
    },
    {
      code: [
        'foo(bar, baz, bum,',
        '    a, b)',
      ].join('\n'),
      output: [
        'foo(',
        'bar, baz, bum,',
        '    a, b',
        ')',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
        { message: 'Expected line break before this paren' },
      ],
    },
    {
      code: [
        'foo(bar,',
        'baz',
        ')',
      ].join('\n'),
      output: [
        'foo(',
        'bar,',
        'baz',
        ')',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
      ],
    },
    {
      code: [
        'foo(',
        'bar,',
        'baz)',
      ].join('\n'),
      output: [
        'foo(',
        'bar,',
        'baz',
        ')',
      ].join('\n'),
      errors: [
        { message: 'Expected line break before this paren' },
      ],
    },
    {
      code: [
        'foo("lorem" +',
        '    "ipsum")',
      ].join('\n'),
      output: [
        'foo(',
        '"lorem" +',
        '    "ipsum"',
        ')',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
        { message: 'Expected line break before this paren' },
      ],
    },
  ]),
});

