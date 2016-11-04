const rule = require('../func-parens-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

function genCases(argPattern) {
  const cases = [
    { code: `!function(${argPattern}) {}` },
    { code: `(${argPattern}) => {}` },
    { code: `function *foo(${argPattern}) {}` },
    { code: `function foo(${argPattern}) {}` },
  ];

  return cases;
}

const ruleTester = new RuleTester();
ruleTester.run('func-parens-newline', rule, {
  valid: withParserOptions([
    ...genCases(''),
    ...genCases('foo'),
    ...genCases('foo, bar'),
    ...genCases('foo=1, bar'),
    ...genCases('[foo]'),
    ...genCases('[foo, bar]'),
    ...genCases('{ foo, bar }'),
    ...genCases('{ foo=1, bar }'),
    ...genCases([
      '',
      'foo,',
      'bar',
      '',
    ].join('\n')),
    ...genCases([
      '',
      'foo,',
      'bar,',
      '',
    ].join('\n')),
    ...genCases([
      'foo, bar, {',
      '  baz,',
      '  bum,',
      '}',
    ].join('\n')),
    ...genCases([
      'foo, bar, [',
      '  baz,',
      '  bum,',
      '], a, {',
      '  b',
      '}',
    ].join('\n')),
    { code: 'x => x + 1' },
    { code: '(x => x + 1)' },
    {
      code: [
        '(',
        '  x => x + 1',
        ')',
      ].join('\n'),
    },
    {
      code: [
        '(x => {',
        '  return x + 1',
        '})',
      ].join('\n'),
    },
  ]),
  invalid: [],
});

