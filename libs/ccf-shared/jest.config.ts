export default {
  displayName: 'ccf-shared',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/libs/ccf-shared',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 37,
      branches: 28,
      lines: 38,
      functions: 22,
    },
  },
};
