const fs = require('fs');
const index = require('../index');
const path = require('path');

describe('index', () => {
  it('exports all rules', () => {
    const ignore = new Set([
      '__tests__',
    ]);
    const files = fs.readdirSync(path.join(__dirname, '../rules'));
    const rules = files
      .filter(f => !ignore.has(f))
      .map(f => f.replace(/\.js$/, ''))
      ;
    expect(Object.keys(index.rules).sort()).toEqual(rules.sort());
  });
});
