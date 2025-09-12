export default {
  displayName: 'ccf-shared',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/libs/ccf-shared',
  // TODO get all up to 85%!
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 65,
      lines: 80,
      statements: 80,
    },
  },
};
