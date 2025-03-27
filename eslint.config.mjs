import nx from '@nx/eslint-plugin';
import storybook from 'eslint-plugin-storybook';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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
      rules: {
        curly: ['error', 'all'],
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'max-depth': ['error', 5],
        'max-nested-callbacks': ['error', 4],
        'no-alert': 'warn',
        'no-console': 'warn',
        'no-constructor-return': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': 'warn',
        'no-empty-function': ['error', { allow: ['arrowFunctions', 'constructors'] }],
        'no-eval': 'error',
        'no-labels': 'error',
        'no-lonely-if': 'warn',
        'no-multi-str': 'error',
        'no-proto': 'error',
        'no-template-curly-in-string': 'warn',
        'no-throw-literal': 'error',
        'no-restricted-syntax': [
          'error',
          {
            selector: 'SequenceExpression',
            message: 'The comma operator is confusing and a common mistake. Don’t use it!',
          },
        ],
        yoda: 'warn',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
      rules: {
        // Disable eslint rules that interfere with typescript rules
        'no-empty-function': 'off',
        'no-shadow': 'off',

        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
        '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions', 'constructors'] }],
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-shadow': 'error',
      },
    },
  ],
  angular: [
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    {
      files: ['**/*.ts'],
      rules: {
        '@angular-eslint/no-async-lifecycle-method': 'error',
        '@angular-eslint/no-attribute-decorator': 'error',
        '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
        '@angular-eslint/prefer-output-readonly': 'error',
        '@angular-eslint/prefer-signals': 'error',

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
            packageJsonLocation: join(dirname(fileURLToPath(import.meta.url)), 'package.json'),
          },
        ],
      },
    },
  ],
};

export default configs.base;
