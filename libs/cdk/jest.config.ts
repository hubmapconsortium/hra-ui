export default {
  displayName: 'cdk',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/libs/cdk',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 63,
      branches: 57,
      lines: 63,
      functions: 65,
    },
  },
};
