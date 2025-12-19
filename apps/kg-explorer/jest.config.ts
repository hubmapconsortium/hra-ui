export default {
  displayName: 'kg-explorer',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/kg-explorer',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 83,
      lines: 85,
      functions: 85,
    },
  },
};
