const rule = require('../array-bracket-newline');
const { RuleTester } = require('eslint');
const { withParserOptions } = require('../../test-utils');

const ruleTester = new RuleTester();
ruleTester.run('array-bracket-newline', rule, {
  valid: withParserOptions([
    { code: '[]' },
    { code: '[\n]' },
    { code: '[a]' },
    {
      code: [
        '"use strict";',
        '[',
        '  a,',
        ']',
      ].join('\n'),
    },
    {
      code: [
        '[',
        '  a,',
        '  b,',
        ']',
      ].join('\n'),
    },
    {
      code: 'var [a] = b',
    },
    {
      code: [
        'var [',
        '  a,',
        '] = b',
      ].join('\n'),
    },
    {
      code: [
        'var [',
        '  a,',
        '  b,',
        '] = c',
      ].join('\n'),
    },
    {
      code: [
        '[{',
        '  a',
        '}]',
      ].join('\n'),
    },
    {
      code: [
        '[function(',
        '  a',
        ') {}]',
      ].join('\n'),
    },
    {
      code: [
        '[function() {',
        '}]',
      ].join('\n'),
    },
    {
      code: [
        '[function() { // comment',
        '}]',
      ].join('\n'),
    },
    {
      code: [
        '[function() { /* comment */ ',
        '}]',
      ].join('\n'),
    },
    {
      code: [
        '[function() { /* comment',
        'test */}]',
      ].join('\n'),
    },
    {
      code: [
        '[x =>',
        '  x',
        ']',
      ].join('\n'),
    },
    {
      code: [
        '[(x =>',
        '  x',
        ')]',
      ].join('\n'),
    },
  ]),
  invalid: [],
});

