module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  clearMocks: true,
  coverageDirectory: '<rootDir>/../coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov'],
};
