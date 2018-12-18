const path = require('path');

module.exports = {
  clearMocks: true,
  restoreMocks: true,
  rootDir: path.resolve(__dirname, '..'),
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
};
