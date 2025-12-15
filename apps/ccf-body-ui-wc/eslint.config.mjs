import { configs, withAngularSelectorPrefix } from '../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.angular,
  withAngularSelectorPrefix('ccf'),
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-signals': 'off',
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
];
