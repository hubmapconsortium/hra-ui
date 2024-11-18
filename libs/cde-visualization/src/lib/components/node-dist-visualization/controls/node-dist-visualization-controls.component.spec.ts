import { render } from '@testing-library/angular';
import { NodeDistVisualizationControlsComponent } from './node-dist-visualization-controls.component';

describe('NodeDistVisualizationControlsComponent', () => {
  it('should create', async () => {
    await expect(render(NodeDistVisualizationControlsComponent)).resolves.toBeDefined();
  });
});
