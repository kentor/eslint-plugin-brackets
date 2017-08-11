const rule = require('../object-curly-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('object-curly-one-per-line', rule, {
  valid: withParserOptions([
    { code: '{}' },
    { code: '{bar}' },
    { code: '{bar, baz}' },
    {
      code: [
        '{',
        '  bar, baz',
        '}',
      ].join('\n'),
    },
    {
      code: [
        '{',
        '  bar,',
        '  baz',
        '}',
      ].join('\n'),
    },
  ], [{ onePerLine: true }]),
  invalid: [],
});

