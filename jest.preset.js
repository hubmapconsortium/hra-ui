const { default: nxPreset } = require('@nx/jest/preset');
const { createCjsPreset } = require('jest-preset-angular/presets');

const esModules = ['nanoid'];

module.exports = {
  ...nxPreset,
  ...createCjsPreset(),

  testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
  transformIgnorePatterns: [`/node_modules/(?!${esModules.join('|')})/`],
  moduleNameMapper: {
    '^nanoid$': 'node_modules/nanoid/index.browser.js',
    '/import-meta$': 'libs/common/import-meta/src/import-meta.mock.ts',
  },

  collectCoverage: true,
  coverageReporters: ['html', 'lcov'],
  coveragePathIgnorePatterns: ['/node_modules/', 'index.ts', '.*-routing.module.ts'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
