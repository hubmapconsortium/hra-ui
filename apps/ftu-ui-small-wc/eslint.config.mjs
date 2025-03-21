import { configs } from '../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.angular,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-signals': 'off',
    },
  },
];
