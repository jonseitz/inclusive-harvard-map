const path = require('path');

module.exports = {
  clearMocks: true,
  restoreMocks: true,
  moduleFileExtensions: ['js'],
  rootDir: path.resolve(__dirname, '..'),
  roots: ['<rootDir>'],
  setupTestFrameworkScriptFile: '<rootDir>/config/enzyme.config.js',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
};
