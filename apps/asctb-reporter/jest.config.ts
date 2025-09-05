export default {
  displayName: 'asctb-reporter',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/asctb-reporter',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 25,
      statements: 25,
    },
  },
};
