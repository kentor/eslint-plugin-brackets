const validClosingPuncs = {
  ')': true,
  ']': true,
  '}': true,
};

const validOpeningPuncs = {
  '(': true,
  '=>': true,
  '[': true,
  '{': true,
};

exports.isValidClosingPunc = function isValidClosingPunc(token) {
  return token.type === 'Template' || (token.type === 'Punctuator' && validClosingPuncs[token.value]);
};

exports.isValidOpeningPunc = function isValidOpeningPunc(token) {
  return token.type === 'Template' || (token.type === 'Punctuator' && validOpeningPuncs[token.value]);
};

exports.validateOnePerLine = function validateOnePerLine(
  startLine, endLine, props, context, message
) {
  let hasSingleLineArg = false;
  let previousProp;
  let currentProp;

  // If it's not more than 3 lines total, it can't be invalid.
  // The other rules will catch it.
  if (endLine - startLine <= 2) {
    return;
  }

  for (let i = 0; i < props.length; i++) {
    currentProp = props[i];

    const isSingleLine =
      currentProp.loc.start.line === currentProp.loc.end.line;
    const isFirstLine = currentProp.loc.start.line === startLine;
    const isLastLine = currentProp.loc.end.line === endLine;
    const isSameLineAsPrevious =
      previousProp && previousProp.loc.end.line === currentProp.loc.start.line;

    if (isSingleLine && !isFirstLine && !isLastLine) {
      hasSingleLineArg = true;
    }

    if (
      hasSingleLineArg
      && isSameLineAsPrevious
      && !isFirstLine
      && !isLastLine
    ) {
      context.report({
        loc: currentProp.loc.start,
        message,
        fix: fixer => fixer.insertTextBefore(currentProp, '\n'),
      });
    }

    previousProp = currentProp;
  }
};
