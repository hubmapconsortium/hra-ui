import { createCustomElement } from '@hra-ui/webcomponents';
import { NodeDistVisComponent } from './lib/node-dist-vis/node-dist-vis.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

export * from './lib/node-dist-vis/node-dist-vis.component';

/** Custom element definition for CdeVisualizationComponent */
export const CdeVisualizationElement = createCustomElement('hra-node-dist-vis', NodeDistVisComponent, {
  providers: [provideExperimentalZonelessChangeDetection()],
});
