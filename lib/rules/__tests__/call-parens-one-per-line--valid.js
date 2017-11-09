const rule = require('../call-parens-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('call-parens-one-per-line', rule, {
  valid: withParserOptions([
    { code: 'foo()' },
    { code: 'foo(bar)' },
    { code: 'foo(bar, baz)' },
    {
      code: [
        'foo(',
        '  bar, baz',
        ')',
      ].join('\n'),
    },
    {
      code: [
        'foo(',
        '  bar,',
        '  baz',
        ')',
      ].join('\n'),
    },
    {
      code: [
        'foo(bar, {',
        '  baz',
        '})',
      ].join('\n'),
    },
    {
      code: [
        'foo(bar, {',
        '  baz',
        '}, this)',
      ].join('\n'),
    },
    {
      code: [
        'foo(bar, {',
        '  baz',
        '}, {',
        ' bip',
        '})',
      ].join('\n'),
    },
    {
      code: [
        'foo({',
        '  bar',
        '}, baz)',
      ].join('\n'),
    },
    {
      code: [
        'then(result => {',
        '}, err => {',
        '})',
      ].join('\n'),
    },
    {
      code: [
        'then(result => {',
        '}, errorHandler)',
      ].join('\n'),
    },
    {
      code: [
        'foo(hbs`',
        '  {{template}}',
        '`, baz)',
      ].join('\n'),
    },
  ], [{ onePerLine: true }]),
  invalid: [],
});

