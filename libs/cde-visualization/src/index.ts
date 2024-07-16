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
export * from './lib/shared/tooltip-position';

// TODO: Move these exports into a separate library
export * from './lib/services/file-loader/file-loader';
export * from './lib/services/file-loader/csv-file-loader.service';
export * from './lib/services/file-loader/json-file-loader.service';
export * from './lib/services/data/color-map-loader.service';
export * from './lib/components/scroll-gradient/scroll-gradient.component';

export type CdeVisualizationElement = InstanceType<CdeVisualizationElementConstructor>;
export type CdeVisualizationElementProps = InputProps<CdeVisualizationComponent>;
export type CdeVisualizationElementConstructor = Awaited<typeof CdeVisualizationElement>;

export const CdeVisualizationElement = createCustomElement('cde-visualization', CdeVisualizationComponent, {
  providers: [provideHttpClient(), provideAnimations(), importProvidersFrom(ColorPickerModule)],
});
