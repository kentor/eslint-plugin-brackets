const rule = require('../conditional-parens-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('conditional-parens-newline', rule, {
  valid: [],
  invalid: withParserOptions([
    {
      code: [
        'if (true',
        ') {}',
      ].join('\n'),
      output: [
        'if (',
        'true',
        ') {}',
      ].join('\n'),
      errors: [{ message: 'Expected line break after this paren' }],
    },
    {
      code: [
        'if (',
        '  true) {}',
      ].join('\n'),
      output: [
        'if (',
        '  true',
        ') {}',
      ].join('\n'),
      errors: [{ message: 'Expected line break before this paren' }],
    },
    {
      code: [
        'if (true &&',
        '    true) {}',
      ].join('\n'),
      output: [
        'if (',
        'true &&',
        '    true',
        ') {}',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
        { message: 'Expected line break before this paren' },
      ],
    },
    {
      code: [
        'while (true',
        ') {}',
      ].join('\n'),
      output: [
        'while (',
        'true',
        ') {}',
      ].join('\n'),
      errors: [{ message: 'Expected line break after this paren' }],
    },
    {
      code: [
        'while (',
        '  true) {}',
      ].join('\n'),
      output: [
        'while (',
        '  true',
        ') {}',
      ].join('\n'),
      errors: [{ message: 'Expected line break before this paren' }],
    },
    {
      code: [
        'while (true &&',
        '    true) {}',
      ].join('\n'),
      output: [
        'while (',
        'true &&',
        '    true',
        ') {}',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
        { message: 'Expected line break before this paren' },
      ],
    },
    {
      code: [
        'if (true) {',
        '} else if (true &&',
        '           false) {',
        '}',
      ].join('\n'),
      output: [
        'if (true) {',
        '} else if (',
        'true &&',
        '           false',
        ') {',
        '}',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
        { message: 'Expected line break before this paren' },
      ],
    },
  ]),
});

