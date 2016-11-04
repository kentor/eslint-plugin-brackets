const rule = require('../object-curly-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('object-curly-newline', rule, {
  valid: withParserOptions([
    { code: 'obj = {}' },
    { code: 'obj = {\n}' },
    { code: 'obj = { a: "b" }' },
    { code: 'obj = { a }' },
    { code: 'obj = { [a]: "b" }' },
    {
      code: [
        'obj = {',
        '  a: "b"',
        '}',
      ].join('\n'),
    },
    {
      code: [
        'obj = {',
        '  a',
        '}',
      ].join('\n'),
    },
    {
      code: [
        'obj = {',
        '  [a]: "b"',
        '}',
      ].join('\n'),
    },
    {
      code: 'var { a } = { a: "b" }',
    },
    {
      code: [
        'var {',
        '  a',
        '} = { a: "b" }',
      ].join('\n'),
    },
  ]),
  invalid: [],
});

