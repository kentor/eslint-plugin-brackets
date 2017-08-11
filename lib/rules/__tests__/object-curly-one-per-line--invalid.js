const rule = require('../object-curly-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('object-curly-one-per-line', rule, {
  valid: [],
  invalid: withParserOptions([
    {
      code: [
        'let foo = {',
        '  bar, baz,',
        '  bip',
        '}',
      ].join('\n'),
      output: [
        'let foo = {',
        '  bar, ',
        'baz,',
        '  bip',
        '}',
      ].join('\n'),
      errors: [
        {
          message: 'All object properties should be on their own '
          + 'line when the object definition spans multiple lines',
        },
      ],
    },
    {
      code: [
        'let foo = {',
        '  bar, baz, foo: function() {',
        '  }',
        '}',
      ].join('\n'),
      output: [
        'let foo = {',
        '  bar, ',
        'baz, ',
        'foo: function() {',
        '  }',
        '}',
      ].join('\n'),
      errors: [
        {
          message: 'All object properties should be on their own '
          + 'line when the object definition spans multiple lines',
        },
        {
          message: 'All object properties should be on their own '
          + 'line when the object definition spans multiple lines',
        },
      ],
    },
  ], [{ onePerLine: true }]),
});

