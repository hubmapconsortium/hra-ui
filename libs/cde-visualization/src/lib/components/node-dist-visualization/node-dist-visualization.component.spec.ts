import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/angular';

import { NodeDistVisualizationComponent } from './node-dist-visualization.component';

describe('NodeDistVisualizationComponent', () => {
  it('should render', async () => {
    await render(NodeDistVisualizationComponent, {
      componentInputs: {
        nodes: [],
        nodeTargetKey: 'target-key',
        nodeTargetValue: 'target-value',
        edges: [],
        maxEdgeDistance: 10,
        colorMap: [],
        colorMapKey: 'color-map-key',
        colorMapValue: 'color-map-value',
        cellTypesSelection: [],
      },
    });

    expect(screen.getByText('Visualization')).toBeInTheDocument();
  });

  it('should download', async () => {
    const component = await render(NodeDistVisualizationComponent, {
      componentInputs: {
        nodes: [],
        nodeTargetKey: 'target-key',
        nodeTargetValue: 'target-value',
        edges: [],
        maxEdgeDistance: 10,
        colorMap: [],
        colorMapKey: 'color-map-key',
        colorMapValue: 'color-map-value',
        cellTypesSelection: [],
      },
    });
    component.fixture.componentInstance.download();
  });
});
