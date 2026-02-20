export default {
  displayName: 'ccf-body-ui',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/libs/ccf-body-ui',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 8,
      lines: 15,
      functions: 14,
    },
  },
};
