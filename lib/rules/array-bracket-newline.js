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
      const { elements, loc } = node;

      if (elements.length === 0) return;
      if (loc.start.line === loc.end.line) return;

      const openingBracket = sourceCode.getFirstToken(node);
      const closingBracket = sourceCode.getLastToken(node);

      const tokensByStartLine =
        groupBy(sourceCode.getTokens(node), 'loc.start.line');
      const tokensByEndLine =
        groupBy(sourceCode.getTokens(node), 'loc.end.line');

      const lastTokenOfFirstLine = last(tokensByStartLine[node.loc.start.line]);
      if (!isValidOpeningPunc(lastTokenOfFirstLine)) {
        context.report({
          loc: openingBracket.loc.start,
          message: 'Expected line break after this bracket',
          fix: fixer => fixer.insertTextAfter(openingBracket, '\n'),
        });
      }

      const firstTokenOfLastLine = tokensByEndLine[node.loc.end.line][0];
      if (!isValidClosingPunc(firstTokenOfLastLine)) {
        context.report({
          loc: closingBracket.loc.start,
          message: 'Expected line break before this bracket',
          fix: fixer => fixer.insertTextBefore(closingBracket, '\n'),
        });
      }
    }

    return {
      ArrayExpression: check,
      ArrayPattern: check,
    };
  },
};
