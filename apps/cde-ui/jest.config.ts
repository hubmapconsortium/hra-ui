export default {
  displayName: 'cde-ui',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/cde-ui',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 77,
      lines: 74,
      functions: 72,
    },
  },
};
