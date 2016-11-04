const parserOptions = {
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
  ecmaVersion: 2017,
};

exports.withParserOptions = function withParserOptions(testCases) {
  testCases.forEach(testCase => {
    testCase.parserOptions = parserOptions;
  });

  return testCases;
};
