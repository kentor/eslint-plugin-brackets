const rule = require('../array-bracket-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('array-bracket-newline', rule, {
  valid: [],
  invalid: withParserOptions([
    {
      code: [
        '[a',
        ']',
      ].join('\n'),
      output: [
        '[',
        'a',
        ']',
      ].join('\n'),
      errors: [{ message: 'Expected line break after this bracket' }],
    },
    {
      code: [
        '[',
        '  a]',
      ].join('\n'),
      output: [
        '[',
        '  a',
        ']',
      ].join('\n'),
      errors: [{ message: 'Expected line break before this bracket' }],
    },
    {
      code: [
        '[',
        '  "b" +',
        '  "c"]',
      ].join('\n'),
      output: [
        '[',
        '  "b" +',
        '  "c"',
        ']',
      ].join('\n'),
      errors: [{ message: 'Expected line break before this bracket' }],
    },
    {
      code: [
        'var [a',
        '] = a',
      ].join('\n'),
      output: [
        'var [',
        'a',
        '] = a',
      ].join('\n'),
      errors: [{ message: 'Expected line break after this bracket' }],
    },
    {
      code: [
        'var [',
        'a] = a',
      ].join('\n'),
      output: [
        'var [',
        'a',
        '] = a',
      ].join('\n'),
      errors: [{ message: 'Expected line break before this bracket' }],
    },
    {
      code: [
        'var [',
        'a] = a',
      ].join('\n'),
      output: [
        'var [',
        'a',
        '] = a',
      ].join('\n'),
      errors: [{ message: 'Expected line break before this bracket' }],
    },
    {
      code: [
        '[[a]',
        ']',
      ].join('\n'),
      output: [
        '[',
        '[a]',
        ']',
      ].join('\n'),
      errors: [{ message: 'Expected line break after this bracket' }],
    },
    {
      code: [
        '[/* test */`(',
        ')`]',
      ].join('\n'),
      output: [
        '[',
        '/* test */`(',
        ')`',
        ']',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this bracket' },
        { message: 'Expected line break before this bracket' },
      ],
    },
    {
      code: [
        '["long line" +',
        ' "oh really?"]',
      ].join('\n'),
      output: [
        '[',
        '"long line" +',
        ' "oh really?"',
        ']',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this bracket' },
        { message: 'Expected line break before this bracket' },
      ],
    },
    {
      code: [
        '[x =>',
        '  x]',
      ].join('\n'),
      output: [
        '[x =>',
        '  x',
        ']',
      ].join('\n'),
      errors: [
        { message: 'Expected line break before this bracket' },
      ],
    },
  ]),
});

