import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { mockDeep } from 'jest-mock-extended';
import embed, { Result } from 'vega-embed';

import { ColorMapEntry, DEFAULT_COLOR_MAP_KEY, DEFAULT_COLOR_MAP_VALUE_KEY } from '../models/color-map';
import { EdgeEntry } from '../models/edge';
import { DEFAULT_NODE_TARGET_KEY, NodeEntry } from '../models/node';
import { rgbToHex } from '../models/color';
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

describe('CdeVisualizationComponent', () => {
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
    creationDate: 'Test Date',
    creationTime: 'Test Time',
    thickness: 1,
    pixelSize: 1,
  };

  const nodeTargetKey = DEFAULT_NODE_TARGET_KEY;
  function createNodeEntry(target: string, x: number, y: number): NodeEntry {
    return { [nodeTargetKey]: target, x, y } as NodeEntry;
  }

  const sampleNodes = [createNodeEntry('a', 0, 0), createNodeEntry('b', 0, 2), createNodeEntry('c', 0, 4)];
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
    createColorMapEntry(2, 'c', [0, 0, 3]),
  ];

  const embedResult = mockDeep<Result>();

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
      .map((entry) => ({ ...entry, [instance.colorMapValue()]: rgbToHex(entry[instance.colorMapValue()]) }));

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
});
