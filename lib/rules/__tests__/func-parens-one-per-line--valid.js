const rule = require('../func-parens-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('call-parens-one-per-line', rule, {
  valid: withParserOptions([
    { code: 'function foo() {}' },
    { code: 'function foo(bar) {}' },
    { code: 'function foo(bar, baz) {}' },
    {
      code: [
        'function foo(',
        '  bar, baz',
        ') {}',
      ].join('\n'),
    },
    {
      code: [
        'function foo(',
        '  bar,',
        '  baz',
        ') {}',
      ].join('\n'),
    },
  ], [{ onePerLine: true }]),
  invalid: [],
});

