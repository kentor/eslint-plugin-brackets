const rule = require('../array-bracket-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('array-bracket-one-per-line', rule, {
  valid: withParserOptions([
    { code: '[]' },
    { code: '[bar]' },
    { code: '[bar, baz]' },
    {
      code: [
        '[',
        '  bar, baz',
        ']',
      ].join('\n'),
    },
    {
      code: [
        '[',
        '  bar,',
        '  baz',
        ']',
      ].join('\n'),
    },
    {
      code: [
        '[bar, {',
        '  baz',
        '}]',
      ].join('\n'),
    },
    {
      code: [
        '[bar, {',
        '  baz',
        '}, this]',
      ].join('\n'),
    },
    {
      code: [
        '[bar, {',
        '  baz',
        '}, {',
        ' bip',
        '}]',
      ].join('\n'),
    },
    {
      code: [
        '[{',
        '  bar',
        '}, baz]',
      ].join('\n'),
    },
  ], [{ onePerLine: true }]),
  invalid: [],
});

