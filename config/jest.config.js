const path = require('path');

module.exports = {
  projects: [
    path.resolve(__dirname, '../src/server/config/jest.config.js'),
    path.resolve(__dirname, '../src/client/config/jest.config.js'),
  ],
  verbose: false,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  timers: 'fake',
};
