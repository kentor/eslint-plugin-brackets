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
  return token.type === 'Punctuator' && validClosingPuncs[token.value];
};

exports.isValidOpeningPunc = function isValidOpeningPunc(token) {
  return token.type === 'Punctuator' && validOpeningPuncs[token.value];
};
