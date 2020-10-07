module.exports = {
  rootDir: './src',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: '<rootDir>/../coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov'],
};
