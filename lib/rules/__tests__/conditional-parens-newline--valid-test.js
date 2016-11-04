const rule = require('../conditional-parens-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('conditional-parens-newline', rule, {
  valid: withParserOptions([
    { code: 'if (true) {}' },
    {
      code: [
        'if (',
        '  true',
        ') {}',
      ].join('\n'),
    },
    {
      code: 'while (true) {}',
    },
    {
      code: [
        'while (',
        '  true',
        ') {}',
      ].join('\n'),
    },
    {
      code: [
        'if (true) {',
        '} else if (false) {',
        '}',
      ].join('\n'),
    },
    {
      code: [
        'if (true) {',
        '} else if (',
        '  false &&',
        '  123',
        ') {',
        '}',
      ].join('\n'),
    },
    {
      code: [
        'if (test(',
        '  yo',
        ')) {}',
      ].join('\n'),
    },
  ]),
  invalid: [],
});

