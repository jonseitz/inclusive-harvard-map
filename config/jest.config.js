const path = require('path');

module.exports = {
  projects: [
    'src/server/config/jest.config.js',
    'src/client/config/jest.config.js',
  ],
  verbose: false,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  timers: 'fake',
};
