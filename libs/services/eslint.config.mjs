import { configs } from '../../eslint.config.mjs';

export default [...configs.base, ...configs.lib, ...configs.angular];
