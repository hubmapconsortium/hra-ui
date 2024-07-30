import { provideHttpClient } from '@angular/common/http';
import { provideScrolling } from '@hra-ui/design-system/scrolling';
import { createCustomElement } from '@hra-ui/webcomponents';
import { CdeVisualizationComponent } from './lib/cde-visualization/cde-visualization.component';

createCustomElement('cde-visualization-wc', CdeVisualizationComponent, {
  providers: [provideHttpClient(), provideScrolling()],
});
