import { configs, withAngularSelectorPrefix } from '../../eslint.config.mjs';

export default [...configs.base, ...configs.angular, withAngularSelectorPrefix('cde')];
