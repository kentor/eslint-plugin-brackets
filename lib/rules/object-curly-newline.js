const last = require('lodash/last');
const { validateOnePerLine } = require('../utils');

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
      const { properties, loc } = node;

      if (properties.length === 0) return;
      if (loc.start.line === loc.end.line) return;

      const openingBrace = sourceCode.getFirstToken(node);
      const closingBrace = sourceCode.getLastToken(node);

      const firstProp = node.properties[0];
      if (openingBrace.loc.start.line === firstProp.loc.start.line) {
        context.report({
          loc: openingBrace.loc.start,
          message: 'Expected line break after this brace',
          fix: fixer => fixer.insertTextAfter(openingBrace, '\n'),
        });
      }

      const lastProp = last(node.properties);
      if (lastProp.loc.end.line === closingBrace.loc.start.line) {
        context.report({
          loc: closingBrace.loc.start,
          message: 'Expected line break before this brace',
          fix: fixer => fixer.insertTextBefore(closingBrace, '\n'),
        });
      }

      if (onePerLine) {
        validateOnePerLine(
          node.loc.start.line,
          node.loc.end.line,
          properties,
          context,
          'All object properties should be on their own line '
          + 'when the object definition spans multiple lines'
        );
      }
    }

    return {
      ObjectExpression: check,
      ObjectPattern: check,
    };
  },
};
