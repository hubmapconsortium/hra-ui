const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env',
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
