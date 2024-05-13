import { createCustomElement } from '@hra-ui/webcomponents';
import { CdeVisualizationComponent } from './lib/cde-visualization/cde-visualization.component';
export * from './lib/cde-visualization/cde-visualization.component';

export const CdeVisualizationElement = createCustomElement('cde-visualization', CdeVisualizationComponent);
