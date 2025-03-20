import { configs } from '../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.angular,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'cde',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'cde',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-signals': 'off',
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
    },
  },
];
