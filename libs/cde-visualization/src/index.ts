import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InputProps, createCustomElement } from '@hra-ui/webcomponents';
import { ColorPickerModule } from 'ngx-color-picker';
import { CdeVisualizationComponent } from './lib/cde-visualization/cde-visualization.component';

export * from './lib/cde-visualization/cde-visualization.component';
export * from './lib/models/color-map';
export * from './lib/models/edge';
export * from './lib/models/metadata';
export * from './lib/models/node';

export type CdeVisualizationElement = InstanceType<CdeVisualizationElementConstructor>;
export type CdeVisualizationElementProps = InputProps<CdeVisualizationComponent>;
export type CdeVisualizationElementConstructor = Awaited<typeof CdeVisualizationElement>;

export const CdeVisualizationElement = createCustomElement('cde-visualization', CdeVisualizationComponent, {
  providers: [provideHttpClient(), provideAnimations(), importProvidersFrom(ColorPickerModule)],
});
