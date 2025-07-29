import { configs } from '../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.angular,
  ...configs.json,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ftu',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ftu',
          style: 'kebab-case',
        },
      ],
    },
  },
];
