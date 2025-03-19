import { configs } from '../../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.angular,
  ...configs.storybook,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
];
