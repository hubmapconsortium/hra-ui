export default {
  displayName: 'ccf-eui',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/ccf-eui',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 34,
      branches: 11,
      lines: 35,
      functions: 23,
    },
  },
};
