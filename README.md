# eslint-plugin-brackets

[![Build Status](https://travis-ci.org/kentor/eslint-plugin-brackets.svg)](https://travis-ci.org/kentor/eslint-plugin-brackets) [![npm](https://img.shields.io/npm/v/eslint-plugin-brackets.svg)](https://www.npmjs.com/package/eslint-plugin-brackets)

Opinionated ESLint style rules dealing with line breaks after opening
brackets and before closing brackets of objects, arrays, conditionals, and
functions.

## Overview

This project is opinionated, meaning there are no options for any of the rules.
However, this may change in the future.

The general goal of these rules is to enforce a coding style that minimizes
diffs when items are added to lists (be it arrays, objects, parameter lists,
etc.)

For example, we want to avoid this:

```js
// Bad

array = ['a',
         'b',
         'c'];

array2 = ["this is a long string" +
          "spanning multiple lines"];

object = { a: 'a',
           b: 'b' };

function foo(bar,
             baz) {
}

call('a',
     'b');

if (test &&
    test2 &&
    test3) {
}
```

And instead prefer this:

```js
// Good

array = [
  'a',
  'b',
  'c',
];

array2 = [
  "this is a long string" +
  "spanning multiple lines"
];

object = {
  a: 'a',
  b: 'b'
};

function foo(
  bar,
  baz
) {
}

call(
  'a',
  'b'
);

if (
  test &&
  test2 &&
  test3
) {
}
```

Why?

- Adding an item to the top of the list or to the bottom of the list will afford
  smaller diffs.
- Changing the name of the assigned variable/callee won't require shifting every
  other item in the list to fix indentation.
- There's an argument for symmetry somewhere.

In other words, there shouldn't be items on the same line as the opening bracket
or closing bracket enclosing the list if the list spans multiple line.

**However**, there is an exception to this: if the last token of the line
containing the opening bracket is another opening bracket, or if the first token
of the line containing the closing bracket is another closing bracket, then that
is allowed:

```js
// Fine

array = ['a', function() { // ends with an opening bracket
}];

call('a', {
  b: 'c',
});

if (confirm(
  'are you sure?'
)) {
}
```

The exception to _that_ is it's not allowed for objects:

```js
// Bad

obj = { a: 'b', c: {
  d: 'e',
} };
```

Preferring this:
```js
// Good

obj = {
  a: 'b',
  c: {
    d: 'e',
  },
};
```

## Note on auto-fixing

All rules can be auto-fixed (running eslint with `--fix`). The fix will add
appropriate line breaks after the opening bracket and before the closing bracket
at violation sites. This may produce code with bad indentation. We rely on
eslint's `indent` rule to fix the indentation in a second pass.

Currently (as of ESLint 3.10) the `indent` rule is broken for params inside call
expressions and expressions inside conditionals, but this should be fixed soon.

## List of rules

- brackets/array-bracket-newline
- brackets/call-parens-newline
- brackets/conditional-parens-newline
- brackets/func-parens-newline
- brackets/object-curly-newline

Take a look at the [rule tests](lib/rules/__tests__) to see valid and invalid
patterns for each rule.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint
```

Next, install `eslint-plugin-brackets`:

```
$ npm install eslint-plugin-brackets
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must
also install `eslint-plugin-brackets` globally.

## Usage

Add `brackets` to the plugins section of your `.eslintrc` configuration
file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "brackets"
  ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "brackets/array-bracket-newline": 2,
    "brackets/object-curly-newline": 2,
  }
}
```

## Development

- Install packages with `npm install` or `yarn`.
- Run `npm run test:watch` to continually run the tests

## License

[MIT](LICENSE.txt)
