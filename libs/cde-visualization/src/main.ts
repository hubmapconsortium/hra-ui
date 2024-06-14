import { provideHttpClient } from '@angular/common/http';
import { createCustomElement } from '@hra-ui/webcomponents';
import { CdeVisualizationComponent } from './lib/cde-visualization/cde-visualization.component';

createCustomElement('cde-visualization-wc', CdeVisualizationComponent, {
  providers: [provideHttpClient()],
});
