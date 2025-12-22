export default {
  displayName: 'dashboard-ui',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/dashboard-ui',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 81,
      branches: 85,
      lines: 80,
      functions: 85,
    },
  },
};
