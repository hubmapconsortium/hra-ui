export default {
  displayName: 'ftu-ui',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/ftu-ui',
  // TODO increase to 85%!
  coverageThreshold: {
    global: {},
  },
};
