import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { createCustomElement } from '@hra-ui/webcomponents';
import { CdeVisualizationComponent } from './lib/cde-visualization/cde-visualization.component';
import { importProvidersFrom } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';
export * from './lib/cde-visualization/cde-visualization.component';
export * from './lib/models/data';

export type CdeVisualizationElementConstructor = Awaited<typeof CdeVisualizationElement>;
export type CdeVisualizationElement = InstanceType<CdeVisualizationElementConstructor>;

export const CdeVisualizationElement = createCustomElement('cde-visualization', CdeVisualizationComponent, {
  providers: [provideHttpClient(), provideAnimations(), importProvidersFrom(ColorPickerModule)],
});

export * from './lib/components/color-picker-label/color-picker-label.component';
