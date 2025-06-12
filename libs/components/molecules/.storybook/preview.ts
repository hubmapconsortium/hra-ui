import { importProvidersFrom } from '@angular/core';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig } from '@storybook/angular';
import { InlineSVGModule } from 'ng-inline-svg-2';
import 'zone.js';
import compodocJson from './compodoc/documentation.json';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { argTypesEnhancers, parameters, decorators as rootDecorators } from '../../../../.storybook/preview';

export { argTypesEnhancers, parameters };

export const decorators = [
  ...rootDecorators,
  applicationConfig({ providers: [importProvidersFrom(InlineSVGModule.forRoot())] }),
];

setCompodocJson(compodocJson);
