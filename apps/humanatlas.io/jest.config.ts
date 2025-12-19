export default {
  displayName: 'humanatlas.io',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/humanatlas.io',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 2,
      branches: 0,
      lines: 2,
      functions: 1,
    },
  },
};
