import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideScrolling } from '@hra-ui/design-system/scrolling';
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
export * from './lib/services/data/color-map-loader.service';

/** Type for CdeVisualizationElement instance */
export type CdeVisualizationElement = InstanceType<CdeVisualizationElementConstructor>;

/** Input properties for CdeVisualizationComponent */
export type CdeVisualizationElementProps = InputProps<CdeVisualizationComponent>;

/** Constructor type for CdeVisualizationElement */
export type CdeVisualizationElementConstructor = Awaited<typeof CdeVisualizationElement>;

/** Custom element definition for CdeVisualizationComponent */
export const CdeVisualizationElement = createCustomElement('cde-visualization', CdeVisualizationComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideScrolling(),
    importProvidersFrom(ColorPickerModule),
    provideDesignSystem(),
  ],
});
