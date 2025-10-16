import { configs } from '../../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.json,
  // {
  //   files: ['**/*.json'],
  //   rules: {
  //     '@nx/dependency-checks': [
  //       'error',
  //       {
  //         ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'],
  //       },
  //     ],
  //   },
  //   languageOptions: {
  //     parser: await import('jsonc-eslint-parser'),
  //   },
  // },
  // {
  //   files: ['**/package.json', '**/package.json', '**/executors.json'],
  //   rules: {
  //     '@nx/nx-plugin-checks': 'error',
  //   },
  //   languageOptions: {
  //     parser: await import('jsonc-eslint-parser'),
  //   },
  // },
];
