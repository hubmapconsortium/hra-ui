import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { CdeVisualizationComponent } from './lib/cde-visualization/cde-visualization.component';

(async () => {
  const app = await createApplication({
    providers: [],
  });

  const visualizationElement = createCustomElement(CdeVisualizationComponent, {
    injector: app.injector,
  });

  customElements.define('cde-visualization', visualizationElement);
})();

export * from './lib/cde-visualization/cde-visualization.component';
