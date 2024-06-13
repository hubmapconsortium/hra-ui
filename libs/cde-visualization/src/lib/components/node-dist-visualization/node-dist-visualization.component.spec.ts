import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { CellTypeEntry } from '../../models/cell-type';
import { EdgeEntry } from '../../models/edge';
import { NodeEntry } from '../../models/node';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { NodeDistVisualizationComponent } from './node-dist-visualization.component';

jest.mock('hra-node-dist-vis/docs/hra-node-dist-vis.wc.js', () => ({}));

function createReactSignal() {
  return { value: undefined };
}

class MockNodeDistVis extends HTMLElement {
  nodesData = createReactSignal();
  nodeTargetKey = createReactSignal();
  nodeTargetValue = createReactSignal();
  edgesUrl = createReactSignal();
  edgesData = createReactSignal();
  maxEdgeDistance = createReactSignal();
  colorMapData = createReactSignal();
  colorMapKey = createReactSignal();
  colorMapValueKey = createReactSignal();
  selection = createReactSignal();

  resetView() {
    // Intentionally empty
  }
  toDataUrl() {
    return 'test/url';
  }
}

customElements.define('hra-node-dist-vis', MockNodeDistVis);

describe('NodeDistVisualizationComponent', () => {
  const sampleTargetKey = 'target-key';
  function createNodeEntry(target: string, x: number, y: number): NodeEntry {
    return { [sampleTargetKey]: target, x, y } as NodeEntry;
  }

  const sampleNodes = [createNodeEntry('a', 0, 0), createNodeEntry('b', 0, 2), createNodeEntry('c', 0, 4)];
  const sampleEdges: EdgeEntry[] = [
    [0, 0, 0, 3, 4, 5, 6],
    [1, 0, 2, 3, 4, 5, 6],
    [2, 0, 4, 3, 4, 5, 6],
  ];
  const sampleCellTypes: CellTypeEntry[] = [
    { name: 'a', count: 2, color: [0, 0, 0] },
    { name: 'b', count: 4, color: [0, 1, 2] },
    { name: 'c', count: 6, color: [0, 1, 3] },
  ];
  const sampleCellTypesSelection: string[] = [sampleCellTypes[0].name, sampleCellTypes[1].name];

  it('should render', async () => {
    await render(NodeDistVisualizationComponent, {
      componentInputs: {
        nodes: sampleNodes,
        nodeTargetKey: sampleTargetKey,
        nodeTargetValue: 'target-value',
        edges: sampleEdges,
        maxEdgeDistance: 10,
        colorMap: [],
        colorMapKey: 'color-map-key',
        colorMapValueKey: 'color-map-value',
        cellTypesSelection: sampleCellTypesSelection,
      },
    });

    expect(screen.getByText('Visualization')).toBeInTheDocument();
  });

  it('forwards calculated edges from hra-node-dist-vis', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(NodeDistVisualizationComponent, {
      componentInputs: {
        nodes: sampleNodes,
        nodeTargetKey: sampleTargetKey,
        nodeTargetValue: 'target-value',
        edges: [],
        maxEdgeDistance: 10,
        colorMap: [],
        colorMapKey: 'color-map-key',
        colorMapValueKey: 'color-map-value',
        cellTypesSelection: sampleCellTypesSelection,
      },
    });

    const nodeDistVis = screen.getByTestId('node-dist-vis') as MockNodeDistVis;
    const edgesEvent = new CustomEvent('edges', { detail: sampleEdges });
    nodeDistVis.dispatchEvent(edgesEvent);

    expect(instance.edges()).toEqual(sampleEdges);
  });

  it('forwards calculated edges from hra-node-dist-vis', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(NodeDistVisualizationComponent, {
      componentInputs: {
        nodes: sampleNodes,
        nodeTargetKey: sampleTargetKey,
        nodeTargetValue: 'target-value',
        edges: [],
        maxEdgeDistance: 10,
        colorMap: [],
        colorMapKey: 'color-map-key',
        colorMapValueKey: 'color-map-value',
        cellTypesSelection: sampleCellTypesSelection,
      },
    });

    const clicks = jest.fn();
    instance.nodeClick.subscribe(clicks);

    const nodeDistVis = screen.getByTestId('node-dist-vis') as MockNodeDistVis;
    const nodeClickEvent = new CustomEvent('nodeClicked', { detail: sampleNodes[0] });
    nodeDistVis.dispatchEvent(nodeClickEvent);

    expect(clicks).toHaveBeenCalledWith(sampleNodes[0]);
  });

  it('should download', async () => {
    await render(NodeDistVisualizationComponent, {
      componentInputs: {
        nodes: sampleNodes,
        nodeTargetKey: sampleTargetKey,
        nodeTargetValue: 'target-value',
        edges: sampleEdges,
        maxEdgeDistance: 10,
        colorMap: [],
        colorMapKey: 'color-map-key',
        colorMapValueKey: 'color-map-value',
        cellTypesSelection: sampleCellTypesSelection,
      },
    });

    const fileSaver = TestBed.inject(FileSaverService);
    const fileSaveSpy = jest.spyOn(fileSaver, 'save');

    const download = screen.getByRole('button');
    await userEvent.click(download);
    expect(fileSaveSpy).toHaveBeenCalledWith('test/url', 'cell-distance-vis.png');
  });

  it('should reset the view', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(NodeDistVisualizationComponent, {
      componentInputs: {
        nodes: sampleNodes,
        nodeTargetKey: sampleTargetKey,
        nodeTargetValue: 'target-value',
        edges: sampleEdges,
        maxEdgeDistance: 10,
        colorMap: [],
        colorMapKey: 'color-map-key',
        colorMapValueKey: 'color-map-value',
        cellTypesSelection: sampleCellTypesSelection,
      },
    });

    const nodeDistVis = screen.getByTestId('node-dist-vis') as MockNodeDistVis;
    const resetViewSpy = jest.spyOn(nodeDistVis, 'resetView');

    instance.resetView();
    expect(resetViewSpy).toHaveBeenCalled();
  });
});
