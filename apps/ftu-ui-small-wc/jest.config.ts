export default {
  displayName: 'ftu-ui-small-wc',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/ftu-ui-small-wc',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 81,
      branches: 85,
      lines: 82,
      functions: 85,
    },
  },
};
