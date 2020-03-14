module.exports = {
  verbose: true,
  testMatch: ['**/?(*.)+(spec.js)'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['**/__mocks__/*'],
  coverageDirectory: '__coverage__',
  coverageReporters: ['lcov', 'text-summary'],
};
