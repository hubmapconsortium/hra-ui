export default {
  displayName: 'cns-website',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/cns-website',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 18,
      branches: 7,
      lines: 17,
      functions: 18,
    },
  },
};
