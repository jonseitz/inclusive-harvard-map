const path = require('path');

module.exports = {
  verbose: false,
  clearMocks: true,
  restoreMocks: true,
  rootDir: path.resolve(__dirname, '..'),
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: path.resolve(__dirname, './mongoSetup.js'),
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
};
