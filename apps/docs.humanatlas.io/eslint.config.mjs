import { configs } from '../../eslint.config.mjs';

export default [...configs.base, ...configs.angular, ...configs.json, ...configs.yaml];
