const groupBy = require('lodash/groupBy');
const last = require('lodash/last');
const { isValidOpeningPunc, isValidClosingPunc } = require('../utils');

module.exports = {
  meta: {
    fixable: 'code',
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    function check(node) {
      const { test } = node;

      const openingParen = sourceCode.getTokenBefore(test);
      const closingParen = sourceCode.getTokenAfter(test);

      if (openingParen.loc.start.line === closingParen.loc.start.line) return;

      const tokensByStartLine =
        groupBy(sourceCode.getTokens(node), 'loc.start.line');
      const tokensByEndLine =
        groupBy(sourceCode.getTokens(node), 'loc.end.line');

      const lastTokenOfFirstLine =
        last(tokensByStartLine[openingParen.loc.start.line]);
      if (!isValidOpeningPunc(lastTokenOfFirstLine)) {
        context.report({
          loc: openingParen.loc.start,
          message: 'Expected line break after this paren',
          fix: fixer => fixer.insertTextAfter(openingParen, '\n'),
        });
      }

      const firstTokenOfLastLine =
        tokensByEndLine[closingParen.loc.end.line][0];
      if (!isValidClosingPunc(firstTokenOfLastLine)) {
        context.report({
          loc: closingParen.loc.start,
          message: 'Expected line break before this paren',
          fix: fixer => fixer.insertTextBefore(closingParen, '\n'),
        });
      }
    }

    return {
      IfStatement: check,
      WhileStatement: check,
    };
  },
};
