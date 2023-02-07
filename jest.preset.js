const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
