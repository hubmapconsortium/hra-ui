import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { NodeDistVisComponent } from '@hra-ui/node-dist-vis';
import {
  AnyDataEntry,
  ColorMapView,
  EdgesView,
  EMPTY_COLOR_MAP_VIEW,
  EMPTY_EDGES_VIEW,
  EMPTY_NODES_VIEW,
  NodesView,
} from '@hra-ui/node-dist-vis/models';
import { render, RenderComponentOptions } from '@testing-library/angular';
import { mock, mockDeep } from 'jest-mock-extended';
import { EMPTY } from 'rxjs';
import embed, { Result } from 'vega-embed';
import { FileSaverService } from '../services/file-saver/file-saver.service';
import { CdeVisualizationComponent } from './cde-visualization.component';

jest.mock('vega-embed', () => jest.fn());
jest.mock('@hra-ui/node-dist-vis', () => ({}));
jest.mock('libs/node-dist-vis/models/src/lib/edges/generator.ts', () => ({
  createEdgeGenerator: () => () => EMPTY,
}));

const embedResult = mockDeep<Result>();

describe('CdeVisualizationComponent', () => {
  const SAMPLE_NODE: AnyDataEntry = ['epithelial', 100, 200];
  const SAMPLE_NODE_2: AnyDataEntry = ['t-cell', 300, 100];
  const SAMPLE_NODE_3: AnyDataEntry = ['b-cell', 300, 100];
  const SAMPLE_EDGE: AnyDataEntry = [0, 1, 100, 200, 0, 100, 300, 0];
  const SAMPLE_COLOR: AnyDataEntry = ['epithelial', [0, 0, 255]];
  const NODES = new NodesView([SAMPLE_NODE, SAMPLE_NODE_2, SAMPLE_NODE_3], EMPTY_NODES_VIEW.keyMapping);
  const EDGES = new EdgesView([SAMPLE_EDGE], EMPTY_EDGES_VIEW.keyMapping);
  const COLOR_MAP = new ColorMapView([SAMPLE_COLOR], EMPTY_COLOR_MAP_VIEW.keyMapping);

  async function setup(options?: RenderComponentOptions<CdeVisualizationComponent>) {
    const result = await render(CdeVisualizationComponent, {
      ...options,
      inputs: {
        nodes: NODES,
        edges: EDGES,
        colorMap: COLOR_MAP,
        maxEdgeDistance: '100',
        metadata: {},
        age: 40,
        ...options?.inputs,
      },
      providers: [
        provideDesignSystemCommon({ scrolling: { disableSensor: true } }),
        provideHttpClient(),
        provideHttpClientTesting(),
        ...(options?.providers ?? []),
      ],
    });

    await result.fixture.whenStable();
    return result;
  }

  beforeAll(() => {
    if (!URL.createObjectURL) {
      URL.createObjectURL = jest.fn().mockReturnValue('blob:fakeblob');
      URL.revokeObjectURL = jest.fn();
    }

    customElements.define(
      'hra-node-dist-vis',
      class MockElement extends HTMLElement {
        readonly instance = mock<NodeDistVisComponent>();
      },
    );

    const canvasContext = mockDeep<CanvasRenderingContext2D>();
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(canvasContext);
    canvasContext.getImageData.mockReturnValue({ data: new Uint8ClampedArray([0, 0, 0]) } as ImageData);
  });

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

  it('should render', async () => {
    await expect(setup()).resolves.toBeDefined();
  });

  it('filters the distances based on the current selection', async () => {
    const { fixture } = await setup();
    fixture.componentInstance.cellTypesSelection.set(['t-cell', 'b-cell']);
    fixture.detectChanges();

    expect(fixture.componentInstance.filteredDistances()).toEqual([]);
  });

  describe('countAdjustments', () => {
    it('adjust counts when there are excluded nodes', async () => {
      const { fixture } = await setup();
      const instance = fixture.componentInstance;
      instance.nodeFilterView.update((prev) => prev.addEntries(undefined, [0]));

      const adjustments = instance.countAdjustments();
      expect(adjustments).toHaveProperty('epithelial');
    });
  });

  describe('updateColor()', () => {
    it('updates the cell types', async () => {
      const { fixture } = await setup();
      const instance = fixture.componentInstance;
      const prevTypes = instance.cellTypes();
      fixture.componentInstance.updateColor(prevTypes[0], [1, 2, 3]);

      const newTypes = instance.cellTypes();
      expect(newTypes).not.toEqual(prevTypes);
      expect(newTypes[0].color).toEqual([1, 2, 3]);
    });
  });

  describe('downloads', () => {
    it('should download nodes', async () => {
      const { fixture } = await setup();

      const fileSaver = TestBed.inject(FileSaverService);
      const fileSaveSpy = jest.spyOn(fileSaver, 'saveData');

      await fixture.componentInstance.downloadNodes();
      expect(fileSaveSpy).toHaveBeenCalledWith(expect.any(Blob), 'nodes.csv');
    });

    it('should download edges', async () => {
      const { fixture } = await setup();

      const fileSaver = TestBed.inject(FileSaverService);
      const fileSaveSpy = jest.spyOn(fileSaver, 'saveData');

      await fixture.componentInstance.downloadEdges();
      expect(fileSaveSpy).toHaveBeenCalledWith(expect.any(Blob), 'edges.csv');
    });

    it('should download color map', async () => {
      const { fixture } = await setup();

      const fileSaver = TestBed.inject(FileSaverService);
      const fileSaveSpy = jest.spyOn(fileSaver, 'saveData');

      await fixture.componentInstance.downloadColorMap();
      expect(fileSaveSpy).toHaveBeenCalledWith(expect.any(Blob), 'color-map.csv');
    });
  });
});
