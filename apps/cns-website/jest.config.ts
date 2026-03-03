export default {
  displayName: 'cns-website',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/cns-website',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 37,
      branches: 42,
      lines: 38,
      functions: 40,
    },
  },
};
