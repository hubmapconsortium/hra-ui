import { setCompodocJson } from '@storybook/addon-docs/angular';
import 'zone.js';
import compodocJson from './compodoc/documentation.json';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { argTypesEnhancers, decorators, parameters } from '../../../../.storybook/preview';

export { argTypesEnhancers, decorators, parameters };

setCompodocJson(compodocJson);
