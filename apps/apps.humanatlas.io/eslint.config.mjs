import { configs } from '../../eslint.config.mjs';

export default [
  ...configs.base,
  ...configs.angular,
  ...configs.yaml,
  {
    ignores: ['src/app/pages/us6/static-data/templates/**/*'],
  },
];
