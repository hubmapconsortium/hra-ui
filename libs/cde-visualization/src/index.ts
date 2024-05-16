import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { createCustomElement } from '@hra-ui/webcomponents';
import { CdeVisualizationComponent } from './lib/cde-visualization/cde-visualization.component';
export * from './lib/cde-visualization/cde-visualization.component';

export type CdeVisualizationElementConstructor = Awaited<typeof CdeVisualizationElement>;
export type CdeVisualizationElement = InstanceType<CdeVisualizationElementConstructor>;

export const CdeVisualizationElement = createCustomElement('cde-visualization', CdeVisualizationComponent, {
  providers: [provideHttpClient(), provideAnimations()],
});
