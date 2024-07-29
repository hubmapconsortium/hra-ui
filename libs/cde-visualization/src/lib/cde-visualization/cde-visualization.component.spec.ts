import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { mockDeep } from 'jest-mock-extended';
import embed, { Result } from 'vega-embed';

import { rgbToHex } from '../models/color';
import { ColorMapEntry, DEFAULT_COLOR_MAP_KEY, DEFAULT_COLOR_MAP_VALUE_KEY } from '../models/color-map';
import { EdgeEntry } from '../models/edge';
import { DEFAULT_NODE_TARGET_KEY, DEFAULT_NODE_TARGET_VALUE, NodeEntry } from '../models/node';
import { FileSaverService } from '../services/file-saver/file-saver.service';
import { CdeVisualizationComponent } from './cde-visualization.component';

jest.mock('hra-node-dist-vis/docs/hra-node-dist-vis.wc.js', () => ({}));
jest.mock('vega-embed', () => ({ default: jest.fn() }));

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
  colorMapValue = createReactSignal();
  selection = createReactSignal();

  resetView() {
    // Intentionally empty
  }
  toDataUrl() {
    return 'test/url';
  }
}

customElements.define('hra-node-dist-vis', MockNodeDistVis);

const sampleData = {
  nodes: undefined,
  edges: undefined,
  colorMap: undefined,
  metadata: undefined,
  nodeTargetKey: DEFAULT_NODE_TARGET_KEY,
  title: 'Test Title',
  technology: 'Test Technology',
  organ: 'Test Organ',
  sex: 'Test Sex',
  age: 30,
  creationTimestamp: 0,
  thickness: 1,
  pixelSize: 1,
};

const nodeTargetKey = DEFAULT_NODE_TARGET_KEY;
function createNodeEntry(target: string, x: number, y: number): NodeEntry {
  return { [nodeTargetKey]: target, x, y } as NodeEntry;
}

const sampleNodes = [
  createNodeEntry('a', 0, 0),
  createNodeEntry('b', 0, 2),
  createNodeEntry('c', 0, 4),
  createNodeEntry('b', 0, 5),
];
const sampleEdges: EdgeEntry[] = [
  [0, 0, 0, 3, 4, 5, 6],
  [1, 0, 2, 3, 4, 5, 6],
  [2, 0, 4, 3, 4, 5, 6],
];

const colorMapKey = DEFAULT_COLOR_MAP_KEY;
const colorMapValueKey = DEFAULT_COLOR_MAP_VALUE_KEY;
function createColorMapEntry(id: number, key: string, value: [number, number, number]): ColorMapEntry {
  return { cell_id: id, [colorMapKey]: key, [colorMapValueKey]: value } as ColorMapEntry;
}
const sampleColorMap = [
  createColorMapEntry(0, 'a', [0, 0, 0]),
  createColorMapEntry(1, 'b', [0, 0, 1]),
  createColorMapEntry(2, 'c', [0, 0, 2]),
];

const embedResult = mockDeep<Result>();

describe('CdeVisualizationComponent', () => {
  beforeEach(() => {
    if (document.fonts === undefined) {
      Object.defineProperty(document, 'fonts', {
        value: mockDeep(),
      });
    }

    jest.mocked(embed).mockReturnValue(Promise.resolve(embedResult));
    embedResult.view.data.mockReturnThis();
    embedResult.view.signal.mockReturnThis();
  });

  it('should update nodes when downloadNodes is called', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(CdeVisualizationComponent, {
      componentInputs: {
        ...sampleData,
        nodes: sampleNodes,
      },
    });

    const fileSaver = TestBed.inject(FileSaverService);
    const fileSaveSpy = jest.spyOn(fileSaver, 'saveCsv').mockReturnValue(undefined);

    const downloadNodesButton = screen.getByText('Nodes');
    await userEvent.click(downloadNodesButton);
    expect(fileSaveSpy).toHaveBeenCalledWith(instance.loadedNodes(), 'nodes.csv');
  });

  it('should update edges when downloadEdges is called', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(CdeVisualizationComponent, {
      componentInputs: {
        ...sampleData,
        edges: sampleEdges,
      },
    });

    const fileSaver = TestBed.inject(FileSaverService);
    const fileSaveSpy = jest.spyOn(fileSaver, 'saveCsv').mockReturnValue(undefined);

    const downloadEdgesButton = screen.getByText('Edges');
    await userEvent.click(downloadEdgesButton);
    expect(fileSaveSpy).toHaveBeenCalledWith(instance.loadedEdges(), 'edges.csv');
  });

  it('should update color map when downloadColorMap is called', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(CdeVisualizationComponent, {
      componentInputs: {
        ...sampleData,
        nodes: sampleNodes,
        colorMap: sampleColorMap,
      },
    });

    const processedColorMap = instance
      .cellTypesAsColorMap()
      .map((entry) => ({ ...entry, [instance.colorMapValueKey()]: rgbToHex(entry[instance.colorMapValueKey()]) }));

    const fileSaver = TestBed.inject(FileSaverService);
    const fileSaveSpy = jest.spyOn(fileSaver, 'saveCsv').mockReturnValue(undefined);

    const downloadColorMapButton = screen.getByText('CSV');
    await userEvent.click(downloadColorMapButton);
    expect(fileSaveSpy).toHaveBeenCalledWith(processedColorMap, 'color-map.csv');
  });

  it('should reset cell types and increase reset counter', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(CdeVisualizationComponent, {
      componentInputs: {
        ...sampleData,
        nodes: sampleNodes,
        edges: sampleEdges,
        colorMap: sampleColorMap,
      },
    });
    instance.resetCellTypes();
    expect(instance.cellTypesResetCounter()).toEqual(1);
  });

  describe('nodeTypeKey()', () => {
    it('should use the default node target key provided', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CdeVisualizationComponent, {
        componentInputs: {
          ...sampleData,
          nodeTargetKey: 'key',
        },
      });
      expect(instance.nodeTypeKey()).toEqual('key');
    });

    it('should use the default node target key if node target key is not provided', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CdeVisualizationComponent, {
        componentInputs: {
          ...sampleData,
          nodeTargetKey: undefined,
        },
      });
      expect(instance.nodeTypeKey()).toEqual(DEFAULT_NODE_TARGET_KEY);
    });
  });

  describe('selectedNodeTargetValue()', () => {
    it('should set a default node target with nodeTargetValue', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CdeVisualizationComponent, {
        componentInputs: {
          ...sampleData,
          nodeTargetValue: 'Endothelial',
        },
      });
      expect(instance.selectedNodeTargetValue()).toEqual('Endothelial');
    });

    it('should set a default node target if nodeTargetValue is not provided', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CdeVisualizationComponent, {
        componentInputs: {
          ...sampleData,
          nodeTargetValue: undefined,
        },
      });
      expect(instance.selectedNodeTargetValue()).toEqual(DEFAULT_NODE_TARGET_VALUE);
    });
  });

  describe('colorMapTypeKey()', () => {
    it('should set color map key', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CdeVisualizationComponent, {
        componentInputs: {
          ...sampleData,
          colorMapKey: 'key',
        },
      });
      expect(instance.colorMapTypeKey()).toEqual('key');
    });

    it('should set color map key as node target key if colorMapKey is undefined and nodeTargetKey is provided', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CdeVisualizationComponent, {
        componentInputs: {
          ...sampleData,
          nodeTargetKey: 'key',
          colorMapKey: undefined,
        },
      });
      expect(instance.colorMapTypeKey()).toEqual('key');
    });

    it('should set a default color map key if colorMapKey and nodeTargetKey are undefined', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CdeVisualizationComponent, {
        componentInputs: {
          ...sampleData,
          nodeTargetKey: undefined,
          colorMapKey: undefined,
        },
      });
      expect(instance.colorMapTypeKey()).toEqual(DEFAULT_COLOR_MAP_KEY);
    });
  });

  describe('cellTypesFromNodes()', () => {
    it('should get cell types from nodes and set color from color map', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CdeVisualizationComponent, {
        componentInputs: {
          ...sampleData,
          nodes: [
            {
              cell_type: 'a',
              x: 0,
              y: 1,
            },
            {
              cell_type: 'b',
              x: 0,
              y: 2,
            },
            {
              cell_type: 'c',
              x: 0,
              y: 3,
            },
          ],
          colorMap: sampleColorMap,
          nodeTargetKey: 'cell_type',
        },
      });

      expect(instance.cellTypesFromNodes()).toEqual([
        {
          name: 'a',
          count: 1,
          color: [0, 0, 0],
        },
        {
          name: 'b',
          count: 1,
          color: [0, 0, 1],
        },
        {
          name: 'c',
          count: 1,
          color: [0, 0, 2],
        },
      ]);
    });

    it('should set default colors if color map not provided', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CdeVisualizationComponent, {
        componentInputs: {
          ...sampleData,
          nodes: sampleNodes,
          colorMap: undefined,
        },
      });
      expect(instance.cellTypesFromNodes()).toEqual([
        {
          name: 'a',
          count: 1,
          color: [112, 165, 168],
        },
        {
          name: 'b',
          count: 2,
          color: [205, 132, 144],
        },
        {
          name: 'c',
          count: 1,
          color: [116, 149, 174],
        },
      ]);
    });
  });
});
