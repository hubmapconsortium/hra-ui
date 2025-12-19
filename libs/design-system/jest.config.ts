export default {
  displayName: 'design-system',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/libs/design-system',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {
      statements: 73,
      branches: 63,
      lines: 72,
      functions: 71,
    },
  },
};
