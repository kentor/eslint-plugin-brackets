const groupBy = require('lodash/groupBy');
const last = require('lodash/last');
const {
  isValidOpeningPunc,
  isValidClosingPunc,
  validateOnePerLine,
} = require('../utils');

module.exports = {
  meta: {
    fixable: 'code',
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    let onePerLine = false;

    if (context.options.length) {
      onePerLine = context.options[0] && context.options[0].onePerLine;
    }

    function check(node) {
      const { params } = node;

      if (params.length === 0) return;

      const openingParen = sourceCode.getTokenBefore(params[0]);
      // Arrow func with no parens
      if (!openingParen || openingParen.value !== '(') return;

      let closingParen = sourceCode.getTokenAfter(last(params));
      if (closingParen.value === ',') {
        closingParen = sourceCode.getTokenAfter(closingParen);
      }
      // Arrow func with no parens
      if (closingParen.value !== ')') return;

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

      if (onePerLine) {
        validateOnePerLine(
          openingParen.loc.start.line,
          closingParen.loc.end.line,
          params,
          context,
          'All parameters should be on their own line '
          + 'when a function definition spans multiple lines'
        );
      }
    }

    return {
      ArrowFunctionExpression: check,
      FunctionDeclaration: check,
      FunctionExpression: check,
    };
  },
};
