const { default: nxPreset } = require('@nx/jest/preset');
const { createCjsPreset } = require('jest-preset-angular/presets');

const ES_MODULES = ['nanoid'];
const COVERAGE_IGNORE_DIRS = ['environments', '__mocks__', '.storybook'];
const COVERAGE_IGNORE_FILES = ['index', 'public-api', 'main', 'polyfills', 'jest.config', 'test-setup', 'import-meta'];
const COVERAGE_IGNORE_FILE_EXTS = ['d', 'module', 'schemas', 'spec', 'stories'];
const COVERAGE_GLOBS = [
  '<rootDir>/**/*.ts',
  `!<rootDir>/**/{${COVERAGE_IGNORE_DIRS.join(',')}}/**`,
  `!<rootDir>/**/{${COVERAGE_IGNORE_FILES.join(',')}}.ts`,
  `!<rootDir>/**/*.{${COVERAGE_IGNORE_FILE_EXTS.join(',')}}.ts`,
];
const NX_TASK_ENV_VARIABLES = ['NX_TASK_TARGET_PROJECT', 'NX_TASK_TARGET_TARGET', 'NX_TASK_TARGET_CONFIGURATION'];

function isRunningInNx() {
  return NX_TASK_ENV_VARIABLES.some((key) => key in process.env && process.env[key]);
}

module.exports = {
  ...nxPreset,
  ...createCjsPreset({
    testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
  }),

  transformIgnorePatterns: [`/node_modules/(?!${ES_MODULES.join('|')})/`],
  moduleNameMapper: {
    '^nanoid$': 'node_modules/nanoid/index.browser.js',
    '/import-meta$': 'libs/common/import-meta/src/import-meta.mock.ts',
  },

  collectCoverage: true,
  coverageReporters: ['html', 'lcovonly', 'json-summary', 'text-summary'],
  collectCoverageFrom: isRunningInNx() ? COVERAGE_GLOBS : undefined,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
