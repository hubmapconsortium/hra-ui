import { configs, withAngularSelectorPrefix } from '../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.lib,
  ...configs.angular,
  withAngularSelectorPrefix('cde'),
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
    },
  },
];
