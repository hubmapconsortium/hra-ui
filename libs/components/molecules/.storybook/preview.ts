import { importProvidersFrom } from '@angular/core';
import { applicationConfig } from '@storybook/angular';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { argTypesEnhancers, decorators as rootDecorators, parameters, setDocs } from '../../../../.storybook/preview';

export { argTypesEnhancers, parameters };

export const decorators = [
  ...rootDecorators,
  applicationConfig({ providers: [importProvidersFrom(InlineSVGModule.forRoot())] }),
];

setDocs('components-molecules');
