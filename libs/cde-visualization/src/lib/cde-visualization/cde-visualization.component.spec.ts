import { LiveAnnouncer } from '@angular/cdk/a11y';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MATERIAL_ANIMATIONS } from '@angular/material/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { SnackbarComponent, SnackbarService } from '@hra-ui/design-system/snackbar';
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
import { EMPTY, Subject } from 'rxjs';
import embed, { Result } from 'vega-embed';
import { ABOUT_CONTENT } from '../components/about/about.content';
import { DOWNLOADS_CONTENT, DownloadRequest } from '../components/downloads/downloads.content';
import { NO_CELL_TYPES_SELECTED_CONTENT, noDistancesContent } from '../components/empty-state/empty-state.content';
import { HistogramComponent } from '../components/histogram/histogram.component';
import { NodeDistVisualizationComponent } from '../components/node-dist-visualization/node-dist-visualization.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { TOOLBAR_CONTENT } from '../components/toolbar/toolbar.content';
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

  describe('loading', () => {
    /** Waits longer than the loaded announcement's debounce */
    const waitForDebounce = () => new Promise((resolve) => setTimeout(resolve, 300));

    it(
      'shows skeletons in the panels whose data is loading',
      async () => {
        const { fixture, container } = await setup();
        fixture.componentInstance['nodesLoading'].set(true);
        fixture.componentInstance['metadataLoading'].set(true);
        fixture.detectChanges();

        expect(container.querySelectorAll('cde-chart-skeleton')).toHaveLength(3);
        expect(container.querySelector('cde-cell-types')).toHaveAttribute('aria-busy', 'true');
        expect(container.querySelector('cde-metadata .metadata-details')).toHaveAttribute('aria-busy', 'true');
      },
      TIMEOUT,
    );

    it(
      'announces once everything has loaded',
      async () => {
        const { fixture } = await setup();
        const announce = jest.spyOn(TestBed.inject(LiveAnnouncer), 'announce');
        const nodesLoading = fixture.componentInstance['nodesLoading'];

        nodesLoading.set(true);
        fixture.detectChanges();
        await waitForDebounce();
        nodesLoading.set(false);
        fixture.detectChanges();
        await waitForDebounce();

        expect(announce).toHaveBeenCalledTimes(1);
        expect(announce).toHaveBeenCalledWith('Visualization loaded');
      },
      TIMEOUT,
    );
  });

  describe('empty states', () => {
    const { heading, description, actionLabel } = NO_CELL_TYPES_SELECTED_CONTENT;

    it(
      'shows no empty states while cell types are selected',
      async () => {
        await setup();

        expect(screen.queryByText(heading)).not.toBeInTheDocument();
      },
      TIMEOUT,
    );

    it(
      'shows an empty state in every visualization panel when no cell types are selected',
      async () => {
        const { fixture } = await setup();
        const announce = jest.spyOn(TestBed.inject(LiveAnnouncer), 'announce');
        fixture.componentInstance.cellTypesSelection.set([]);
        fixture.detectChanges();

        expect(screen.getAllByText(heading)).toHaveLength(3);
        expect(announce).toHaveBeenCalledTimes(1);
        expect(announce).toHaveBeenCalledWith(`${heading}. ${description}`);
      },
      TIMEOUT,
    );

    it(
      'selects every cell type from an empty state',
      async () => {
        const { fixture } = await setup();
        const instance = fixture.componentInstance;
        instance.cellTypesSelection.set([]);
        fixture.detectChanges();

        fireEvent.click(screen.getAllByRole('button', { name: actionLabel })[0]);
        fixture.detectChanges();

        expect(instance.cellTypesSelection()).toEqual(instance.cellTypes().map(({ name }) => name));
        expect(screen.queryByText(heading)).not.toBeInTheDocument();
      },
      TIMEOUT,
    );

    it(
      'shows an empty state in the charts only when just the anchor cell type is selected',
      async () => {
        const { fixture } = await setup({ inputs: { nodeTargetSelector: 'epithelial' } });
        fixture.componentInstance.cellTypesSelection.set(['epithelial']);
        fixture.detectChanges();

        expect(screen.getAllByText(noDistancesContent('epithelial').heading)).toHaveLength(2);
        expect(screen.queryByText(heading)).not.toBeInTheDocument();
      },
      TIMEOUT,
    );

    it(
      'disables every download when no cell types are selected',
      async () => {
        const { fixture } = await setup();
        const instance = fixture.componentInstance;
        const downloadNodes = jest.spyOn(instance, 'downloadNodes').mockResolvedValue();
        instance.cellTypesSelection.set([]);
        fixture.detectChanges();

        const files = DOWNLOADS_CONTENT.groups.flatMap((group) => group.files).map(({ id }) => id);
        expect(instance['unavailableDownloads']()).toEqual({
          files,
          notice: DOWNLOADS_CONTENT.unavailable.noCellTypes,
        });

        await instance.handleDownload({ file: 'cells', format: 'csv' });
        expect(downloadNodes).not.toHaveBeenCalled();
      },
      TIMEOUT,
    );

    it(
      'disables the chart downloads when just the anchor cell type is selected',
      async () => {
        const { fixture } = await setup({ inputs: { nodeTargetSelector: 'epithelial' } });
        const instance = fixture.componentInstance;
        instance.cellTypesSelection.set(['epithelial']);
        fixture.detectChanges();

        expect(instance['unavailableDownloads']()).toEqual({
          files: ['violin-graph', 'histogram'],
          notice: DOWNLOADS_CONTENT.unavailable.noDistances('epithelial'),
        });
      },
      TIMEOUT,
    );
  });

  describe('toolbar actions', () => {
    function getToolbar(fixture: Awaited<ReturnType<typeof setup>>['fixture']): ToolbarComponent {
      return fixture.debugElement.query(By.directive(ToolbarComponent)).componentInstance;
    }

    it(
      'shares the display options with the panels',
      async () => {
        const { fixture } = await setup();
        const instance = fixture.componentInstance;
        const toolbar = getToolbar(fixture);

        toolbar.cellLinks.set(false);
        toolbar.cellLinkData.set(false);
        toolbar.allMetadata.set(true);
        fixture.detectChanges();

        expect(instance['edgesDisabled']()).toBe(true);
        expect(instance['showCellLinkData']()).toBe(false);
        expect(instance['showAllMetadata']()).toBe(true);
      },
      TIMEOUT,
    );

    it(
      'resets the view',
      async () => {
        const { fixture } = await setup();
        const panel = fixture.debugElement.query(By.directive(NodeDistVisualizationComponent)).componentInstance;
        const resetView = jest.spyOn(panel, 'resetView').mockImplementation(() => undefined);

        getToolbar(fixture).resetViewClick.emit();
        expect(resetView).toHaveBeenCalled();
      },
      TIMEOUT,
    );

    it(
      'restores deleted cells',
      async () => {
        const { fixture } = await setup();
        const instance = fixture.componentInstance;
        instance.nodeFilterView.update((prev) => prev.addEntries(undefined, [0]));
        expect(instance['hasDeletedCells']()).toBe(true);

        getToolbar(fixture).restoreDeletedCellsClick.emit();
        expect(instance['hasDeletedCells']()).toBe(false);
      },
      TIMEOUT,
    );

    it(
      'resets colors, keeps the cell type selection, and undoes the reset from the snackbar',
      async () => {
        const { fixture } = await setup();
        const undo$ = new Subject<void>();
        const snackbarRef = mock<MatSnackBarRef<SnackbarComponent>>();
        snackbarRef.onAction.mockReturnValue(undo$);
        const snackbarOpen = jest.spyOn(TestBed.inject(SnackbarService), 'open').mockReturnValue(snackbarRef);
        const instance = fixture.componentInstance;
        const histogram = fixture.debugElement.query(By.directive(HistogramComponent)).componentInstance;
        const originalTypes = instance.cellTypes();
        instance.updateColor(originalTypes[0], [1, 2, 3]);
        const changedTypes = instance.cellTypes();
        instance['allCellsColor'].set([4, 5, 6]);
        instance.cellTypesSelection.set(['t-cell']);
        fixture.detectChanges();
        expect(histogram.allCellsColor()).toEqual([4, 5, 6]);

        getToolbar(fixture).resetColorsClick.emit();
        fixture.detectChanges();
        expect(instance.cellTypes()).toEqual(originalTypes);
        expect(histogram.allCellsColor()).toBeUndefined();
        expect(instance.cellTypesSelection()).toEqual(['t-cell']);
        expect(snackbarOpen).toHaveBeenCalledWith('Colors reset', 'Undo', false, 'end', expect.anything());

        undo$.next();
        fixture.detectChanges();
        expect(instance.cellTypes()).toEqual(changedTypes);
        expect(histogram.allCellsColor()).toEqual([4, 5, 6]);
      },
      TIMEOUT,
    );

    it(
      'resets everything and undoes all but the view from the snackbar',
      async () => {
        const { fixture } = await setup();
        const undo$ = new Subject<void>();
        const snackbarRef = mock<MatSnackBarRef<SnackbarComponent>>();
        snackbarRef.onAction.mockReturnValue(undo$);
        const snackbarOpen = jest.spyOn(TestBed.inject(SnackbarService), 'open').mockReturnValue(snackbarRef);
        const instance = fixture.componentInstance;
        const panel = fixture.debugElement.query(By.directive(NodeDistVisualizationComponent)).componentInstance;
        const resetView = jest.spyOn(panel, 'resetView').mockImplementation(() => undefined);
        const originalTypes = instance.cellTypes();
        const allCellTypes = instance.cellTypesSelection();
        instance.updateColor(originalTypes[0], [1, 2, 3]);
        const changedTypes = instance.cellTypes();
        instance['allCellsColor'].set([4, 5, 6]);
        instance.cellTypesSelection.set(['t-cell']);
        instance.nodeFilterView.update((prev) => prev.addEntries(undefined, [0]));
        instance['edgesDisabled'].set(true);
        instance['showCellLinkData'].set(false);
        instance['showAllMetadata'].set(true);
        instance['viewMode'].set('select');
        fixture.detectChanges();
        expect(panel.viewMode()).toBe('select');

        getToolbar(fixture).resetEverythingClick.emit();
        fixture.detectChanges();
        expect(resetView).toHaveBeenCalledTimes(1);
        expect(instance.cellTypes()).toEqual(originalTypes);
        expect(instance['allCellsColor']()).toBeUndefined();
        expect(instance.cellTypesSelection()).toEqual(allCellTypes);
        expect(instance['hasDeletedCells']()).toBe(false);
        expect(instance['edgesDisabled']()).toBe(false);
        expect(instance['showCellLinkData']()).toBe(true);
        expect(instance['showAllMetadata']()).toBe(false);
        expect(panel.viewMode()).toBe('explore');
        expect(snackbarOpen).toHaveBeenCalledWith('Visualization reset', 'Undo', false, 'end', expect.anything());

        undo$.next();
        fixture.detectChanges();
        expect(resetView).toHaveBeenCalledTimes(1);
        expect(instance.cellTypes()).toEqual(changedTypes);
        expect(instance['allCellsColor']()).toEqual([4, 5, 6]);
        expect(instance.cellTypesSelection()).toEqual(['t-cell']);
        expect(instance['hasDeletedCells']()).toBe(true);
        expect(instance['edgesDisabled']()).toBe(true);
        expect(instance['showCellLinkData']()).toBe(false);
        expect(instance['showAllMetadata']()).toBe(true);
        expect(panel.viewMode()).toBe('select');
      },
      TIMEOUT,
    );

    it(
      'shares the all cells color between the histogram and the toolbar',
      async () => {
        const { fixture } = await setup();
        const histogram = fixture.debugElement.query(By.directive(HistogramComponent)).componentInstance;
        const toolbar = getToolbar(fixture);

        toolbar.allCellsColor.set([7, 8, 9]);
        fixture.detectChanges();
        expect(histogram.allCellsColor()).toEqual([7, 8, 9]);
        expect(toolbar.allCellsColor()).toEqual([7, 8, 9]);
      },
      TIMEOUT,
    );

    it(
      'switches the theme with the Theme menu',
      async () => {
        const { fixture } = await setup();
        const toolbar = getToolbar(fixture);
        expect(toolbar.showThemeMenu()).toBe(true);

        toolbar.themePreference.set('dark');
        fixture.detectChanges();
        expect(fixture.componentInstance['themeSwitch'].theme()).toEqual('dark');
        expect(fixture.nativeElement.style.colorScheme).toEqual('dark');
      },
      TIMEOUT,
    );

    it(
      'hides the Theme menu',
      async () => {
        const { fixture } = await setup({ inputs: { hideThemeMenu: '' } });

        expect(getToolbar(fixture).showThemeMenu()).toBe(false);
      },
      TIMEOUT,
    );
  });

  describe('drawer', () => {
    async function openDrawer(itemName = TOOLBAR_CONTENT.downloads.label, regionName = DOWNLOADS_CONTENT.title) {
      const result = await setup();
      const trigger = screen.getByRole('button', { name: itemName });
      const drawer = result.fixture.debugElement.query(By.directive(MatDrawer)).injector.get(MatDrawer);

      // Browsers focus a button when it's clicked, and the drawer returns focus to it on close
      trigger.focus();
      fireEvent.click(trigger);
      const region = await screen.findByRole('region', { name: regionName });
      await waitFor(() => expect(drawer.opened).toBe(true));
      await waitFor(() => expect(region).toContainElement(document.activeElement as HTMLElement));
      return { ...result, trigger, drawer, region };
    }

    async function expectClosed(drawer: MatDrawer, trigger: HTMLElement) {
      await waitFor(() => expect(drawer.opened).toBe(false));
      expect(trigger).toHaveFocus();
      await waitFor(() => expect(trigger).not.toHaveClass('hra-navigation-rail-item--active'));
    }

    it(
      'opens downloads as a labelled region from the toolbar',
      async () => {
        const { trigger, region } = await openDrawer();

        expect(region).not.toHaveAttribute('aria-modal');
        expect(trigger).toHaveClass('hra-navigation-rail-item--active');
      },
      TIMEOUT,
    );

    it(
      'opens the about sheet from the toolbar and returns focus to it',
      async () => {
        const { trigger, drawer, region } = await openDrawer(TOOLBAR_CONTENT.info.label, ABOUT_CONTENT.title);

        expect(within(region).getByRole('heading', { name: 'Distance visualization' })).toBeInTheDocument();
        fireEvent.click(within(region).getByRole('button', { name: ABOUT_CONTENT.closeLabel }));
        await expectClosed(drawer, trigger);
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
