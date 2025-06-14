import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDesignSystem } from '@hra-ui/design-system';
import { InputProps, createCustomElement } from '@hra-ui/webcomponents';
import { CdeVisualizationComponent } from './lib/cde-visualization/cde-visualization.component';

export * from './lib/cde-visualization/cde-visualization.component';
export * from './lib/models/color-map';
export * from './lib/models/metadata';
export * from './lib/shared/tooltip-position';

// TODO: Move these exports into a separate library
export * from './lib/services/data/color-map-loader.service';

/** Type for CdeVisualizationElement instance */
export type CdeVisualizationElement = InstanceType<Awaited<typeof CdeVisualizationElement>>;

/** Input properties for CdeVisualizationComponent */
export type CdeVisualizationElementProps = InputProps<CdeVisualizationComponent>;

/** Custom element definition for CdeVisualizationComponent */
export const CdeVisualizationElement = createCustomElement('cde-visualization', CdeVisualizationComponent, {
  providers: [provideHttpClient(), provideAnimations(), provideDesignSystem()],
});
