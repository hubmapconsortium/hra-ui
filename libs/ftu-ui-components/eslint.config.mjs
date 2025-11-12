import { configs, withAngularSelectorPrefix } from '../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.lib,
  ...configs.angular,
  ...configs.json,
  withAngularSelectorPrefix('ftu'),
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-signals': 'off',
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
    },
  },
];
