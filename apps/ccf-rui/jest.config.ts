export default {
  displayName: 'ccf-rui',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/ccf-rui',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 36,
      branches: 19,
      lines: 36,
      functions: 34,
    },
  },
};
