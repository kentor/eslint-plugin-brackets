const parserOptions = {
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
  ecmaVersion: 2017,
};

exports.withParserOptions = function withParserOptions(testCases, options) {
  testCases.forEach(testCase => {
    testCase.parserOptions = parserOptions;
    testCase.options = options;
  });

  return testCases;
};
