import { configs } from '../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.angular,
  ...configs.yaml,
  {
    ignores: ['static/**/*'],
  },
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/label-has-associated-control': 'warn',
    },
  },
];
