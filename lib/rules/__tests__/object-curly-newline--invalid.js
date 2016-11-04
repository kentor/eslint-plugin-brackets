const rule = require('../object-curly-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('object-curly-newline', rule, {
  valid: [],
  invalid: withParserOptions([
    {
      code: [
        'obj = { a: "b"',
        '}',
      ].join('\n'),
      output: [
        'obj = {',
        ' a: "b"',
        '}',
      ].join('\n'),
      errors: [{ message: 'Expected line break after this brace' }],
    },
    {
      code: [
        'obj = {',
        '  a: "b" }',
      ].join('\n'),
      output: [
        'obj = {',
        '  a: "b" ',
        '}',
      ].join('\n'),
      errors: [{ message: 'Expected line break before this brace' }],
    },
    {
      code: [
        'obj = {',
        '  a: "b" +',
        '     "c" }',
      ].join('\n'),
      output: [
        'obj = {',
        '  a: "b" +',
        '     "c" ',
        '}',
      ].join('\n'),
      errors: [{ message: 'Expected line break before this brace' }],
    },
    {
      code: [
        'var { a',
        '} = { a: "b" }',
      ].join('\n'),
      output: [
        'var {',
        ' a',
        '} = { a: "b" }',
      ].join('\n'),
      errors: [{ message: 'Expected line break after this brace' }],
    },
    {
      code: [
        'var {',
        'a } = { a: "b" }',
      ].join('\n'),
      output: [
        'var {',
        'a ',
        '} = { a: "b" }',
      ].join('\n'),
      errors: [{ message: 'Expected line break before this brace' }],
    },
    {
      code: [
        'var a = { test: [',
        '  a',
        '] }',
      ].join('\n'),
      output: [
        'var a = {',
        ' test: [',
        '  a',
        '] ',
        '}',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this brace' },
        { message: 'Expected line break before this brace' },
      ],
    },
    {
      code: [
        'var a = { test: [ // test',
        '  a',
        '] }',
      ].join('\n'),
      output: [
        'var a = {',
        ' test: [ // test',
        '  a',
        '] ',
        '}',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this brace' },
        { message: 'Expected line break before this brace' },
      ],
    },
  ]),
});

