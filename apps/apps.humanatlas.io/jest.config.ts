export default {
  displayName: 'apps.humanatlas.io',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/apps.humanatlas.io',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 73,
      branches: 60,
      lines: 72,
      functions: 72,
    },
  },
};
