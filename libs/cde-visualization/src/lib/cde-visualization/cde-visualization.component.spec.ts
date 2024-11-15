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

  it('filters the distances based on the current selection', async () => {
    const { fixture } = await setup();
    fixture.componentInstance.cellTypesSelection.set(['type 7']);

    expect(fixture.componentInstance.filteredDistances()).toEqual([]);
  });
});
