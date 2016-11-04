const rule = require('../func-parens-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

function genCases(argPattern, options) {
  return [
    Object.assign({}, options, {
      code: `!function(${argPattern}) {}`,
      output: `!function(${options.output}) {}`,
    }),
    Object.assign({}, options, {
      code: `(${argPattern}) => {}`,
      output: `(${options.output}) => {}`,
    }),
    Object.assign({}, options, {
      code: `function *foo(${argPattern}) {}`,
      output: `function *foo(${options.output}) {}`,
    }),
    Object.assign({}, options, {
      code: `function foo(${argPattern}) {}`,
      output: `function foo(${options.output}) {}`,
    }),
  ];
}

const ruleTester = new RuleTester();
ruleTester.run('func-parens-newline', rule, {
  valid: [],
  invalid: withParserOptions([
    ...genCases([
      'foo, bar',
      '',
    ].join('\n'), {
      output: [
        '',
        'foo, bar',
        '',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
      ],
    }),
    ...genCases([
      'foo, bar,',
      '',
    ].join('\n'), {
      output: [
        '',
        'foo, bar,',
        '',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
      ],
    }),
    ...genCases([
      '',
      'foo, bar',
    ].join('\n'), {
      output: [
        '',
        'foo, bar',
        '',
      ].join('\n'),
      errors: [
        { message: 'Expected line break before this paren' },
      ],
    }),
    ...genCases([
      '',
      'foo, bar,',
    ].join('\n'), {
      output: [
        '',
        'foo, bar,',
        '',
      ].join('\n'),
      errors: [
        { message: 'Expected line break before this paren' },
      ],
    }),
    ...genCases([
      'foo,',
      'bar',
    ].join('\n'), {
      output: [
        '',
        'foo,',
        'bar',
        '',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
        { message: 'Expected line break before this paren' },
      ],
    }),
    ...genCases([
      'foo,',
      'bar,',
    ].join('\n'), {
      output: [
        '',
        'foo,',
        'bar,',
        '',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
        { message: 'Expected line break before this paren' },
      ],
    }),
    ...genCases([
      'foo, bar={baz',
      '         }',
    ].join('\n'), {
      output: [
        '',
        'foo, bar={baz',
        '         }',
      ].join('\n'),
      errors: [
        { message: 'Expected line break after this paren' },
      ],
    }),
  ]),
});

