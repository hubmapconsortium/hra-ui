import nx from '@nx/eslint-plugin';
import schema from 'eslint-plugin-json-schema-validator';
import json from 'eslint-plugin-jsonc';
import storybook from 'eslint-plugin-storybook';
import yaml from 'eslint-plugin-yml';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Create rules that enforces that a prefix is used for all component and directive selectors.
 * Should always be included **after** the angular configuration.
 *
 * @param {string} prefix
 * @returns Rules that enforces the prefix
 */
export function withAngularSelectorPrefix(prefix) {
  return {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          style: 'kebab-case',
          prefix,
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          style: 'camelCase',
          prefix,
        },
      ],
    },
  };
}

export const configs = {
  // Base rules for all js/ts projects
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

  // Library only rules
  lib: [
    ...json.configs['flat/base'],
    {
      rules: {
        '@nx/dependency-checks': 'error',
      },
    },
  ],

  // Angular rules
  angular: [
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    withAngularSelectorPrefix('hra'),
    {
      files: ['**/*.ts'],
      rules: {
        '@angular-eslint/no-async-lifecycle-method': 'error',
        '@angular-eslint/no-attribute-decorator': 'error',
        '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
        '@angular-eslint/prefer-output-readonly': 'error',
        '@angular-eslint/prefer-signals': 'error',
      },
    },
    {
      files: ['**/*.html'],
      rules: {
        '@angular-eslint/template/attributes-order': [
          'error',
          {
            order: [
              'STRUCTURAL_DIRECTIVE',
              'ATTRIBUTE_BINDING',
              'INPUT_BINDING',
              'TWO_WAY_BINDING',
              'OUTPUT_BINDING',
              'TEMPLATE_REFERENCE',
            ],
          },
        ],
        '@angular-eslint/template/no-interpolation-in-attributes': 'error',
        '@angular-eslint/template/prefer-self-closing-tags': 'error',
        '@angular-eslint/template/prefer-static-string-properties': 'error',
      },
    },
  ],

  // Json and Yaml rules
  json: [...json.configs['flat/recommended-with-json']],
  yaml: [...yaml.configs['flat/recommended'], ...yaml.configs['flat/prettier']],
  schema: [
    ...schema.configs['flat/recommended'],
    {
      rules: {
        'json-schema-validator/no-invalid': 'error',
      },
    },
  ],

  // Storybook rules
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
