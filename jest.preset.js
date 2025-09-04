const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '.*import-meta': 'libs/common/import-meta/src/import-meta.mock.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|vega-embed|vega|vega-lite|vega-themes|vega-tooltip|vega-interpreter)',
  ],
  collectCoverage: true,
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
