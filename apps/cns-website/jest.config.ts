export default {
  displayName: 'cns-website',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/cns-website',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 50,
      lines: 60,
      functions: 60,
    },
  },
};
