import { configs, withAngularSelectorPrefix } from '../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.angular,
  withAngularSelectorPrefix('ccf'),
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
    },
  },
];
