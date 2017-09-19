const rule = require('../call-parens-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('call-parens-one-per-line', rule, {
  valid: [],
  invalid: withParserOptions([
    {
      code: [
        'foo(',
        '  bar, baz,',
        '  bip',
        ')',
      ].join('\n'),
      output: [
        'foo(',
        '  bar, ',
        'baz,',
        '  bip',
        ')',
      ].join('\n'),
      errors: [
        {
          message: 'All arguments should be on their '
          + 'own line in a multiline function call',
        },
      ],
    },
    {
      code: [
        'foo({',
        '  bar',
        '}, baz,',
        'bip',
        ')',
      ].join('\n'),
      output: [
        'foo({',
        '  bar',
        '}, ',
        'baz,',
        'bip',
        ')',
      ].join('\n'),
      errors: [
        {
          message: 'All arguments should be on their '
          + 'own line in a multiline function call',
        },
      ],
    },
    {
      code: [
        'foo(',
        '  bar, baz, function() {',
        '  }',
        ')',
      ].join('\n'),
      output: [
        'foo(',
        '  bar, ',
        'baz, ',
        'function() {',
        '  }',
        ')',
      ].join('\n'),
      errors: [
        {
          message: 'All arguments should be on their '
          + 'own line in a multiline function call',
        },
        {
          message: 'All arguments should be on their '
          + 'own line in a multiline function call',
        },
      ],
    },
  ], [{ onePerLine: true }]),
});

