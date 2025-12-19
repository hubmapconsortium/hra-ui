export default {
  displayName: 'asctb-reporter',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/asctb-reporter',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 19,
      branches: 1,
      lines: 18,
      functions: 3,
    },
  },
};
