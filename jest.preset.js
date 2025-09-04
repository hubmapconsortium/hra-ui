const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
  moduleNameMapper: {
    '.*import-meta': 'libs/common/import-meta/src/import-meta.mock.ts',
    '^vega-embed$': '<rootDir>/node_modules/vega-embed/build/embed.js',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|vega-embed|vega|vega-lite)'],
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
