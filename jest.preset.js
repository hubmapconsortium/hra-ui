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
  coverageReporters: ['html', 'lcovonly', 'json-summary', 'text-summary'],
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',

    // General exclusions
    '!<rootDir>/**/index.ts',
    '!<rootDir>/**/*.schemas.ts',

    // Testing exclusions
    '!<rootDir>/**/*.spec.ts',
    '!<rootDir>/**/test-setup.ts',
    '!<rootDir>/**/jest.config.ts',
    '!<rootDir>/**/__mocks__/**',

    // Application exclusions
    '!<rootDir>/**/main.ts',
    '!<rootDir>/**/polyfills.ts',
    '!<rootDir>/**/environments/**',

    // Storybook exclusions
    '!<rootDir>/**/.storybook/**',
    '!<rootDir>/**/*.stories.ts',

    // Other exclusions
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/dist/**',
    '!<rootDir>/node_modules/**',

    // Special exclusions
    '!<rootDir>/**/import-meta.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
