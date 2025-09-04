export default {
  displayName: 'ccf-rui',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/ccf-rui',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 45,
      lines: 60,
      statements: 60,
    },
  },
};
