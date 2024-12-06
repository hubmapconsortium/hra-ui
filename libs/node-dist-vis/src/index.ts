import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { createCustomElement, InputProps } from '@hra-ui/webcomponents';
import { NodeDistVisComponent } from './lib/node-dist-vis/node-dist-vis.component';

export * from './lib/node-dist-vis/node-dist-vis.component';

export type NodeDistVisElement = InstanceType<Awaited<typeof NodeDistVisElement>>;
export type NodeDistVisElementProps = InputProps<NodeDistVisComponent>;

/** Custom element definition for NodeDistVisComponent */
export const NodeDistVisElement = createCustomElement('hra-node-dist-vis', NodeDistVisComponent, {
  providers: [provideExperimentalZonelessChangeDetection()],
});
