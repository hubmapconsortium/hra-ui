import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { NodeDistVisComponent } from '@hra-ui/node-dist-vis';
import { render, RenderComponentOptions } from '@testing-library/angular';
import { mock, mockDeep } from 'jest-mock-extended';
import embed, { Result } from 'vega-embed';
import { CdeVisualizationComponent } from './cde-visualization.component';
import { EMPTY } from 'rxjs';

jest.mock('vega-embed', () => ({ default: jest.fn() }));
jest.mock('@hra-ui/node-dist-vis', () => ({}));
jest.mock('libs/node-dist-vis/models/src/lib/edges/generator.ts', () => ({
  createEdgeGenerator: () => () => EMPTY,
}));

const embedResult = mockDeep<Result>();

describe('CdeVisualizationComponent', () => {
  async function setup(options?: RenderComponentOptions<CdeVisualizationComponent>) {
    const result = await render(CdeVisualizationComponent, {
      ...options,
      inputs: {
        ...options?.inputs,
        maxEdgeDistance: '100',
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

  // it('should reset cell types and increase reset counter', async () => {
  //   const {
  //     fixture: { componentInstance: instance },
  //   } = await setup({
  //     componentInputs: {
  //       ...sampleData,
  //       nodes: sampleNodes,
  //       edges: sampleEdges,
  //       colorMap: sampleColorMap,
  //     },
  //   });
  //   instance.resetCellTypes();
  //   expect(instance.cellTypesResetCounter()).toEqual(1);
  // });

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

  // describe('downloadNodes()', () => {
  //   it('should download nodes', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodes: sampleNodes,
  //       },
  //     });

  //     const expectedNodes = [
  //       {
  //         'Cell Type': 'a',
  //         X: 0,
  //         Y: 0,
  //       },
  //       {
  //         'Cell Type': 'b',
  //         X: 0,
  //         Y: 2,
  //       },
  //       {
  //         'Cell Type': 'c',
  //         X: 0,
  //         Y: 4,
  //       },
  //       {
  //         'Cell Type': 'b',
  //         X: 0,
  //         Y: 5,
  //       },
  //     ];

  //     const fileSaver = TestBed.inject(FileSaverService);
  //     const fileSaveSpy = jest.spyOn(fileSaver, 'saveCsv').mockReturnValue(undefined);

  //     instance.downloadNodes();
  //     expect(fileSaveSpy).toHaveBeenCalledWith(expectedNodes, 'nodes.csv');
  //   });
  // });

  // describe('downloadEdges()', () => {
  //   it('should update edges when downloadEdges is called', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodes: sampleNodes,
  //         edges: sampleEdges,
  //       },
  //     });

  //     const expectedEdges = [
  //       {
  //         'Cell ID': 0,
  //         X1: 0,
  //         X2: 4,
  //         Y1: 0,
  //         Y2: 5,
  //         Z1: 3,
  //         Z2: 6,
  //       },
  //       {
  //         'Cell ID': 1,
  //         X1: 0,
  //         X2: 4,
  //         Y1: 2,
  //         Y2: 5,
  //         Z1: 3,
  //         Z2: 6,
  //       },
  //       {
  //         'Cell ID': 2,
  //         X1: 0,
  //         X2: 4,
  //         Y1: 4,
  //         Y2: 5,
  //         Z1: 3,
  //         Z2: 6,
  //       },
  //     ];

  //     const fileSaver = TestBed.inject(FileSaverService);
  //     const fileSaveSpy = jest.spyOn(fileSaver, 'saveCsv').mockReturnValue(undefined);

  //     instance.downloadEdges();
  //     expect(fileSaveSpy).toHaveBeenCalledWith(expectedEdges, 'edges.csv');
  //   });
  // });

  // describe('downloadColorMap()', () => {
  //   it('should update color map when downloadColorMap is called', async () => {
  //     const {
  //       fixture: { componentInstance: instance },
  //     } = await setup({
  //       componentInputs: {
  //         ...sampleData,
  //         nodes: sampleNodes,
  //         colorMap: sampleColorMap,
  //       },
  //     });

  //     const processedColorMap = instance
  //       .cellTypesAsColorMap()
  //       .map((entry) => ({ ...entry, [instance.colorMapValueKey()]: rgbToHex(entry[instance.colorMapValueKey()]) }));

  //     const fileSaver = TestBed.inject(FileSaverService);
  //     const fileSaveSpy = jest.spyOn(fileSaver, 'saveCsv').mockReturnValue(undefined);

  //     instance.downloadColorMap();
  //     expect(fileSaveSpy).toHaveBeenCalledWith(processedColorMap, 'color-map.csv');
  //   });
  // });
});
