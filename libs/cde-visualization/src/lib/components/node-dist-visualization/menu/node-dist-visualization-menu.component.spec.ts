import { render } from '@testing-library/angular';
import { NodeDistVisualizationMenuComponent } from './node-dist-visualization-menu.component';

describe('NodeDistVisualizationMenuComponent', () => {
  it('should create', async () => {
    await expect(render(NodeDistVisualizationMenuComponent)).resolves.toBeDefined();
  });
});
