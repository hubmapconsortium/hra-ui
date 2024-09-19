import { createCustomElement } from '@hra-ui/webcomponents';
import { NodeDistVisComponent } from './lib/node-dist-vis/node-dist-vis.component';

export * from './lib/node-dist-vis/node-dist-vis.component';

/** Custom element definition for CdeVisualizationComponent */
export const CdeVisualizationElement = createCustomElement('hra-node-dist-vis', NodeDistVisComponent, {
  providers: [],
});

export * from './lib/deck-gl-visualization/deck-gl-visualization.component';
