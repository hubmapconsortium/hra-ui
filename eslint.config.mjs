import nx from '@nx/eslint-plugin';
import storybook from 'eslint-plugin-storybook';
import { join } from 'node:path';

export const configs = {
  base: [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/javascript'],
    ...nx.configs['flat/typescript'],
    {
      ignores: ['**/dist', '**/coverage'],
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
            depConstraints: [
              {
                sourceTag: 'type:app',
                onlyDependOnLibsWithTags: ['type:lib'],
              },
              {
                sourceTag: 'type:lib',
                onlyDependOnLibsWithTags: ['type:lib'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
      rules: {},
    },
  ],
  angular: [
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    {
      files: ['**/*.ts'],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'hra',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'hra',
            style: 'kebab-case',
          },
        ],
      },
    },
    {
      files: ['**/*.html'],
      rules: {},
    },
  ],
  storybook: [
    ...storybook.configs['flat/recommended'],
    {
      ignores: ['!.storybook'],
    },
    {
      rules: {
        'storybook/no-uninstalled-addons': [
          'error',
          {
            packageJsonLocation: join(import.meta.dirname, 'package.json'),
          },
        ],
      },
    },
  ],
};

export default configs.base;
