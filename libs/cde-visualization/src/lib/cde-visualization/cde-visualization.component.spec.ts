import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { NodeDistVisComponent } from '@hra-ui/node-dist-vis';
import { AnyDataEntry, EdgesView, EMPTY_EDGES_VIEW, EMPTY_NODES_VIEW, NodesView } from '@hra-ui/node-dist-vis/models';
import { render, RenderComponentOptions } from '@testing-library/angular';
import { mock, mockDeep } from 'jest-mock-extended';
import { EMPTY } from 'rxjs';
import embed, { Result } from 'vega-embed';

import { CdeVisualizationComponent } from './cde-visualization.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));
jest.mock('@hra-ui/node-dist-vis', () => ({}));
jest.mock('libs/node-dist-vis/models/src/lib/edges/generator.ts', () => ({
  createEdgeGenerator: () => () => EMPTY,
}));

const embedResult = mockDeep<Result>();

describe('CdeVisualizationComponent', () => {
  const SAMPLE_NODE: AnyDataEntry = ['epithelial', 100, 200];
  const SAMPLE_EDGE: AnyDataEntry = [0, 1, 100, 200, 0, 100, 300, 0];
  const NODES = new NodesView([SAMPLE_NODE], EMPTY_NODES_VIEW.keyMapping);
  const EDGES = new EdgesView([SAMPLE_EDGE], EMPTY_EDGES_VIEW.keyMapping);

  async function setup(options?: RenderComponentOptions<CdeVisualizationComponent>) {
    const result = await render(CdeVisualizationComponent, {
      ...options,
      inputs: {
        nodes: NODES,
        edges: EDGES,
        maxEdgeDistance: '100',
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

  it('should reset cell types and increase reset counter', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await setup({});
    instance.resetCellTypes();
    // expect(instance.cellTypesResetCounter()).toEqual(1);
  });

  // describe('nodeTypeKey()', () => {
  //   it('should use the default node target key provided', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodeTargetKey: 'key',
  //       },
  //     });
  //     expect(instance.nodeTypeKey()).toEqual('key');
  //   });

  //   it('should use the default node target key if node target key is not provided', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodeTargetKey: undefined,
  //       },
  //     });
  //     expect(instance.nodeTypeKey()).toEqual(DEFAULT_NODE_TARGET_KEY);
  //   });
  // });

  // describe('selectedNodeTargetValue()', () => {
  //   it('should set a default node target with nodeTargetValue', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodeTargetValue: 'Endothelial',
  //       },
  //     });
  //     expect(instance.selectedNodeTargetValue()).toEqual('Endothelial');
  //   });

  //   it('should set a default node target if nodeTargetValue is not provided', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodeTargetValue: undefined,
  //       },
  //     });
  //     expect(instance.selectedNodeTargetValue()).toEqual(DEFAULT_NODE_TARGET_VALUE);
  //   });
  // });

  // describe('colorMapTypeKey()', () => {
  //   it('should set color map key', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         colorMapKey: 'key',
  //       },
  //     });
  //     expect(instance.colorMapTypeKey()).toEqual('key');
  //   });

  //   it('should set color map key as node target key if colorMapKey is undefined and nodeTargetKey is provided', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodeTargetKey: 'key',
  //         colorMapKey: undefined,
  //       },
  //     });
  //     expect(instance.colorMapTypeKey()).toEqual('key');
  //   });

  //   it('should set a default color map key if colorMapKey and nodeTargetKey are undefined', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodeTargetKey: undefined,
  //         colorMapKey: undefined,
  //       },
  //     });
  //     expect(instance.colorMapTypeKey()).toEqual(DEFAULT_COLOR_MAP_KEY);
  //   });
  // });

  // describe('cellTypesFromNodes()', () => {
  //   it('should get cell types from nodes and set color from color map', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodes: [
  //           {
  //             'Cell Type': 'a',
  //             x: 0,
  //             y: 1,
  //           },
  //           {
  //             'Cell Type': 'b',
  //             x: 0,
  //             y: 2,
  //           },
  //           {
  //             'Cell Type': 'c',
  //             x: 0,
  //             y: 3,
  //           },
  //         ],
  //         colorMap: sampleColorMap,
  //         nodeTargetKey: 'Cell Type',
  //       },
  //     });

  //     expect(instance.cellTypesFromNodes()).toEqual([
  //       {
  //         name: 'a',
  //         count: 1,
  //         color: [0, 0, 0],
  //         outgoingEdgeCount: 0,
  //       },
  //       {
  //         name: 'b',
  //         count: 1,
  //         color: [0, 0, 1],
  //         outgoingEdgeCount: 0,
  //       },
  //       {
  //         name: 'c',
  //         count: 1,
  //         color: [0, 0, 2],
  //         outgoingEdgeCount: 0,
  //       },
  //     ]);
  //   });

  //   it('should set default colors if color map not provided', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodes: sampleNodes,
  //         colorMap: undefined,
  //       },
  //     });
  //     expect(instance.cellTypesFromNodes()).toEqual([
  //       {
  //         name: 'a',
  //         count: 1,
  //         color: [112, 165, 168],
  //         outgoingEdgeCount: 0,
  //       },
  //       {
  //         name: 'b',
  //         count: 2,
  //         color: [205, 132, 144],
  //         outgoingEdgeCount: 0,
  //       },
  //       {
  //         name: 'c',
  //         count: 1,
  //         color: [116, 149, 174],
  //         outgoingEdgeCount: 0,
  //       },
  //     ]);
  //   });
  // });

  describe('updateColor()', () => {
    it('should update color in an entry', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await setup({});

      instance.updateColor({ name: 'epithelial', count: 20, outgoingEdgeCount: 2, color: [0, 0, 0] }, [1, 1, 1]);
      console.log(instance.cellTypes());
    });
  });

  describe('downloadNodes()', () => {
    it('should download nodes', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await setup({});

      // const fileSaver = TestBed.inject(FileSaverService);
      // const fileSaveSpy = jest.spyOn(fileSaver, 'saveCsv').mockReturnValue(undefined);

      instance.downloadNodes();
      // expect(fileSaveSpy).toHaveBeenCalledWith(expectedNodes, 'nodes.csv');
    });
  });

  describe('downloadEdges()', () => {
    it('should download edges', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await setup({});

      instance.downloadEdges();
    });
  });

  describe('downloadColorMap()', () => {
    it('should download color map', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await setup({});

      instance.downloadColorMap();
    });
  });
});
