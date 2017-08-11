const rule = require('../func-parens-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('call-parens-one-per-line', rule, {
  valid: [],
  invalid: withParserOptions([
    {
      code: [
        'function foo(',
        '  bar, baz,',
        '  bip',
        ') {}',
      ].join('\n'),
      output: [
        'function foo(',
        '  bar, ',
        'baz,',
        '  bip',
        ') {}',
      ].join('\n'),
      errors: [
        {
          message: 'All parameters should be on their own '
          + 'line when a function definition spans multiple lines',
        },
      ],
    },
  ], [{ onePerLine: true }]),
});

