const rule = require('../array-bracket-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('array-bracket-one-per-line', rule, {
  valid: [],
  invalid: withParserOptions([
    {
      code: [
        '[',
        '  bar, baz,',
        '  bip',
        ']',
      ].join('\n'),
      output: [
        '[',
        '  bar, ',
        'baz,',
        '  bip',
        ']',
      ].join('\n'),
      errors: [
        {
          message: 'All array elements should be on their own '
          + 'line when the array spans multiple lines',
        },
      ],
    },
    {
      code: [
        '[{',
        '  bar',
        '}, baz,',
        'bip]',
      ].join('\n'),
      output: [
        '[{',
        '  bar',
        '}, ',
        'baz,',
        'bip',
        ']',
      ].join('\n'),
      errors: [
        {
          message: 'All array elements should be on their own '
          + 'line when the array spans multiple lines',
        },
        {
          message: 'Expected line break before this bracket',
        },
      ],
    },
    {
      code: [
        '[',
        '  bar, baz, function() {',
        '  }',
        ']',
      ].join('\n'),
      output: [
        '[',
        '  bar, ',
        'baz, ',
        'function() {',
        '  }',
        ']',
      ].join('\n'),
      errors: [
        {
          message: 'All array elements should be on their own '
          + 'line when the array spans multiple lines',
        },
        {
          message: 'All array elements should be on their own '
          + 'line when the array spans multiple lines',
        },
      ],
    },
  ], [{ onePerLine: true }]),
});

