import { configs } from '../../../eslint.config.mjs';

export default [...configs.base, ...configs.plugin, ...configs.json];
