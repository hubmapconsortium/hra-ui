import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MATERIAL_ANIMATIONS } from '@angular/material/core';
import { MatDrawer } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
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
import { fireEvent, render, RenderComponentOptions, screen, waitFor, within } from '@testing-library/angular';
import { mock, mockDeep } from 'jest-mock-extended';
import { EMPTY } from 'rxjs';
import embed, { Result } from 'vega-embed';
import { DOWNLOADS_CONTENT, DownloadRequest } from '../components/downloads/downloads.content';
import { HistogramComponent } from '../components/histogram/histogram.component';
import { NodeDistVisualizationComponent } from '../components/node-dist-visualization/node-dist-visualization.component';
import { ViolinComponent } from '../components/violin/violin.component';
import { FileSaverService } from '../services/file-saver/file-saver.service';
import { CdeVisualizationComponent } from './cde-visualization.component';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AnimationDriver } from '@angular/animations/browser';
import { MockAnimationDriver } from '@angular/animations/browser/testing';

jest.mock('vega-embed', () => jest.fn());
jest.mock('@hra-ui/node-dist-vis', () => ({}));
jest.mock('libs/node-dist-vis/models/src/lib/edges/generator.ts', () => ({
  createEdgeGenerator: () => () => EMPTY,
}));

const TIMEOUT = 10000; // In ms
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
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        {
          provide: AnimationDriver,
          useClass: MockAnimationDriver,
        },
        { provide: MATERIAL_ANIMATIONS, useValue: { animationsDisabled: true } },
        ...(options?.providers ?? []),
      ],
      imports: [MatIconTestingModule],
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

  it(
    'filters the distances based on the current selection',
    async () => {
      const { fixture } = await setup();
      fixture.componentInstance.cellTypesSelection.set(['t-cell', 'b-cell']);
      fixture.detectChanges();

      expect(fixture.componentInstance.filteredDistances()).toEqual([]);
    },
    TIMEOUT,
  );

  describe('countAdjustments', () => {
    it(
      'adjust counts when there are excluded nodes',
      async () => {
        const { fixture } = await setup();
        const instance = fixture.componentInstance;
        instance.nodeFilterView.update((prev) => prev.addEntries(undefined, [0]));

        const adjustments = instance.countAdjustments();
        expect(adjustments).toHaveProperty('epithelial');
      },
      TIMEOUT,
    );
  });

  describe('updateColor()', () => {
    it(
      'updates the cell types',
      async () => {
        const { fixture } = await setup();
        const instance = fixture.componentInstance;
        const prevTypes = instance.cellTypes();
        fixture.componentInstance.updateColor(prevTypes[0], [1, 2, 3]);

        const newTypes = instance.cellTypes();
        expect(newTypes).not.toEqual(prevTypes);
        expect(newTypes[0].color).toEqual([1, 2, 3]);
      },
      TIMEOUT,
    );
  });

  describe('downloads', () => {
    it(
      'should download nodes',
      async () => {
        const { fixture } = await setup();

        const fileSaver = TestBed.inject(FileSaverService);
        const fileSaveSpy = jest.spyOn(fileSaver, 'saveData');

        await fixture.componentInstance.downloadNodes();
        expect(fileSaveSpy).toHaveBeenCalledWith(expect.any(Blob), 'nodes.csv');
      },
      TIMEOUT,
    );

    it(
      'should download edges',
      async () => {
        const { fixture } = await setup();

        const fileSaver = TestBed.inject(FileSaverService);
        const fileSaveSpy = jest.spyOn(fileSaver, 'saveData');

        await fixture.componentInstance.downloadEdges();
        expect(fileSaveSpy).toHaveBeenCalledWith(expect.any(Blob), 'edges.csv');
      },
      TIMEOUT,
    );

    it(
      'should download color map',
      async () => {
        const { fixture } = await setup();

        const fileSaver = TestBed.inject(FileSaverService);
        const fileSaveSpy = jest.spyOn(fileSaver, 'saveData');

        await fixture.componentInstance.downloadColorMap();
        expect(fileSaveSpy).toHaveBeenCalledWith(expect.any(Blob), 'color-map.csv');
      },
      TIMEOUT,
    );
  });

  describe('downloads drawer', () => {
    async function openDrawer() {
      const result = await setup();
      const trigger = screen.getByRole('button', { name: DOWNLOADS_CONTENT.title });
      const drawer = result.fixture.debugElement.query(By.directive(MatDrawer)).injector.get(MatDrawer);

      // Browsers focus a button when it's clicked, and the drawer returns focus to it on close
      trigger.focus();
      fireEvent.click(trigger);
      const region = await screen.findByRole('region', { name: DOWNLOADS_CONTENT.title });
      await waitFor(() => expect(drawer.opened).toBe(true));
      await waitFor(() => expect(region).toContainElement(document.activeElement as HTMLElement));
      return { ...result, trigger, drawer, region };
    }

    async function expectClosed(drawer: MatDrawer, trigger: HTMLElement) {
      await waitFor(() => expect(drawer.opened).toBe(false));
      expect(trigger).toHaveFocus();
      await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    }

    it(
      'opens as a labelled region from the downloads button',
      async () => {
        const { trigger, region } = await openDrawer();

        expect(region).not.toHaveAttribute('aria-modal');
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      },
      TIMEOUT,
    );

    it(
      'closes from the close button',
      async () => {
        const { trigger, drawer, region } = await openDrawer();

        fireEvent.click(within(region).getByRole('button', { name: DOWNLOADS_CONTENT.closeLabel }));
        await expectClosed(drawer, trigger);
      },
      TIMEOUT,
    );

    it(
      'closes on escape',
      async () => {
        const { trigger, drawer, region } = await openDrawer();

        fireEvent.keyDown(region, { key: 'Escape', keyCode: 27 });
        await expectClosed(drawer, trigger);
      },
      TIMEOUT,
    );

    it(
      'closes when clicking outside the drawer',
      async () => {
        const { trigger, drawer, container } = await openDrawer();

        fireEvent.click(container.querySelector('.mat-drawer-backdrop') as HTMLElement);
        await expectClosed(drawer, trigger);
      },
      TIMEOUT,
    );

    it(
      'downloads files from the drawer',
      async () => {
        const { drawer, region } = await openDrawer();
        const fileSaver = TestBed.inject(FileSaverService);
        const fileSaveSpy = jest.spyOn(fileSaver, 'saveData');

        fireEvent.click(within(region).getByRole('button', { name: 'Download cells CSV' }));
        await waitFor(() => expect(fileSaveSpy).toHaveBeenCalledWith(expect.any(Blob), 'nodes.csv'));
        expect(drawer.opened).toBe(true);
      },
      TIMEOUT,
    );

    it(
      'dispatches each download request to the matching handler',
      async () => {
        const { fixture } = await setup();
        const instance = fixture.componentInstance;
        const getPanel = <T>(type: new (...args: never[]) => T) =>
          fixture.debugElement.query(By.directive(type)).componentInstance as T;

        const downloadNodes = jest.spyOn(instance, 'downloadNodes').mockResolvedValue();
        const downloadEdges = jest.spyOn(instance, 'downloadEdges').mockResolvedValue();
        const downloadColorMap = jest.spyOn(instance, 'downloadColorMap').mockResolvedValue();
        const visDownload = jest.spyOn(getPanel(NodeDistVisualizationComponent), 'download').mockResolvedValue();
        const violinDownload = jest.spyOn(getPanel(ViolinComponent), 'download').mockResolvedValue();
        const histogramDownload = jest.spyOn(getPanel(HistogramComponent), 'download').mockResolvedValue();

        const requests: [DownloadRequest, jest.SpyInstance, unknown[]][] = [
          [{ file: 'cells', format: 'csv' }, downloadNodes, []],
          [{ file: 'cell-links', format: 'csv' }, downloadEdges, []],
          [{ file: 'color-map', format: 'csv' }, downloadColorMap, []],
          [{ file: 'visualization', format: 'png' }, visDownload, []],
          [{ file: 'violin-graph', format: 'png' }, violinDownload, ['png']],
          [{ file: 'violin-graph', format: 'svg' }, violinDownload, ['svg']],
          [{ file: 'histogram', format: 'png' }, histogramDownload, ['png']],
          [{ file: 'histogram', format: 'svg' }, histogramDownload, ['svg']],
        ];

        for (const [request, handler, args] of requests) {
          handler.mockClear();
          await instance.handleDownload(request);
          expect(handler).toHaveBeenCalledWith(...args);
        }
      },
      TIMEOUT,
    );
  });
});
