import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectorRef, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleHarness } from '@angular/material/button-toggle/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideAssetHref } from '@hra-ui/common/url';
import { ColorMapEntry, DEFAULT_COLOR_MAP_KEY, DEFAULT_COLOR_MAP_VALUE_KEY, Metadata } from '@hra-ui/cde-visualization';
import { DEFAULT_NODE_TARGET_SELECTOR } from '@hra-ui/node-dist-vis';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { mock } from 'jest-mock-extended';
import { Theme, ThemeService } from '../../services/theme-service/theme.service';
import { VisualizationDataService } from '../../services/visualization-data-service/visualization-data.service';
import { CreateVisualizationPageComponent, ExtendedFileLoadError } from './create-visualization-page.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));
jest.mock('@hra-ui/node-dist-vis', () => ({
  DEFAULT_NODE_TARGET_SELECTOR: 'Default',
}));
jest.mock('@hra-ui/node-dist-vis/models', () => ({
  ColorMapView: class MockColorMapView {},
  NodesView: class MockNodesView {
    constructor(
      readonly data: Record<string, unknown>[],
      readonly keyMapping: Record<string, unknown>,
    ) {}
  },
}));
jest.mock('@hra-ui/cde-visualization', () => ({
  ...jest.requireActual('@hra-ui/cde-visualization'),
  CdeVisualizationModule: class MockCdeVisualizationModule {},
}));
jest.mock('@hra-ui/design-system', () => ({
  ...jest.requireActual('@hra-ui/design-system'),
  provideDesignSystem: () => [],
}));

const resizeObserverInstance = mock<ResizeObserver>();
global.ResizeObserver = jest.fn(() => resizeObserverInstance);
const nodeTargetKey = 'Cell Type';
const testId = 'file-upload';

function createNodeEntry(targetKey: string, target: string, x: number, y: number): Record<string, unknown> {
  return { [targetKey]: target, x, y };
}
const sampleNodes = [
  createNodeEntry(nodeTargetKey, 'a', 0, 0),
  createNodeEntry(nodeTargetKey, 'b', 0, 2),
  createNodeEntry(nodeTargetKey, 'c', 0, 4),
];
const processedSampleData = {
  colorMapKey: 'Cell Type',
  colorMapValueKey: 'HEX',
  metadata: {
    creationTimestamp: 0,
  } satisfies Metadata,
  nodeTargetKey: 'Cell Type',
  nodeTargetValue: 'a',
  nodes: [
    { 'Cell Type': 'a', x: 0, y: 0, z: undefined },
    { 'Cell Type': 'b', x: 0, y: 2, z: undefined },
    { 'Cell Type': 'c', x: 0, y: 4, z: undefined },
  ],
};

function createColorMapEntry(
  id: number,
  key: string,
  value: [number, number, number],
  mapKey: string = DEFAULT_COLOR_MAP_KEY,
  valueKey: string = DEFAULT_COLOR_MAP_VALUE_KEY,
): ColorMapEntry {
  return { cell_id: id, [mapKey]: key, [valueKey]: value } as ColorMapEntry;
}
const sampleColorMap = [
  createColorMapEntry(0, 'a', [0, 0, 0]),
  createColorMapEntry(1, 'b', [0, 0, 1]),
  createColorMapEntry(2, 'c', [0, 0, 3]),
];

const sampleMetadata = {
  organ: {
    id: 'sampleId',
    label: 'Sample Label',
  },
};

const csvNodeDataWrongKeys = `BADKEY,x,y
  a,0,0
  b,1,2`;

const csvNodeDataMissingValues = `Cell Type,x,y
  a,0
  b,1,2`;

const csvColorMap = `cell_id,Cell Type,HEX
  0,cell1,"[0,0,0]"
  1,cell2,"[1,1,1]"`;

const csvColorMapWrongKeys = `cell_id,bad_celltype_key,bad_cell_color
  0,cell1,"[0,0,0]"
  1,cell2,"[1,1,1]"`;

describe('CreateVisualizationPageComponent', () => {
  const theme = signal<Theme>('light');
  const providers = [
    provideAssetHref('http://localhost/'),
    provideHttpClient(),
    provideHttpClientTesting(),
    { provide: ThemeService, useValue: { theme } },
  ];

  let instance: CreateVisualizationPageComponent;
  let fixture: ComponentFixture<CreateVisualizationPageComponent>;

  beforeEach(async () => {
    jest.spyOn(Date, 'now').mockReturnValue(0);
    theme.set('light');

    const context = await render(CreateVisualizationPageComponent, {
      providers,
      imports: [MatIconTestingModule],
      componentInputs: {
        organs: [],
      },
    });

    fixture = context.fixture;
    instance = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('passes the background image to the page styles', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--page-background-image')).toContain(
      'create-visualization-page-background.png',
    );
  });

  it('passes the dark background image in the dark theme', () => {
    theme.set('dark');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--page-background-image')).toContain(
      'create-visualization-page-background-dark.png',
    );
  });

  describe('template links', () => {
    it('renders outlined links that open the templates in a new tab', () => {
      const dataTemplate = screen.getByRole('link', { name: 'Open template for cell data, opens in a new tab' });
      const colorTemplate = screen.getByRole('link', { name: 'Open template for color maps, opens in a new tab' });

      for (const link of [dataTemplate, colorTemplate]) {
        expect(link).toHaveTextContent(/^\s*Open template/);
        expect(link).toHaveAttribute('mat-stroked-button');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
      expect(dataTemplate).toHaveAttribute(
        'href',
        expect.stringContaining('1EUf7CUZb0NprgxBeX3nS3GXyUM89edIRH6NSeUsR3nY'),
      );
      expect(colorTemplate).toHaveAttribute(
        'href',
        expect.stringContaining('1sjaGTCs3J9CjrkowxkyJrIfHk64w_nDyYrgprbMbdqE'),
      );
    });
  });

  describe('card headings', () => {
    it('only contain the step number and title', () => {
      const headings = screen.getAllByRole('heading', { level: 2 });

      const titles = [
        'Upload data',
        'Organize data',
        'Configure parameters',
        'Optional: Add metadata',
        'Optional: Configure colors',
        'Visualize cell distance data',
      ];

      expect(headings.map((heading) => heading.querySelector('.card-title')?.textContent)).toEqual(titles);
      titles.forEach((title, index) => {
        expect(screen.getByRole('heading', { level: 2, name: `Step ${index + 1} of 6: ${title}` })).toBeInTheDocument();
      });
      for (const heading of headings) {
        expect(within(heading).queryByRole('button')).toBeNull();
        expect(within(heading).queryByRole('link')).toBeNull();
      }
    });
  });

  describe('required column headers', () => {
    it('marks the required selects as required for assistive technology', () => {
      for (const name of ['X axis', 'Y axis', 'Cell type']) {
        expect(screen.getByRole('combobox', { name })).toHaveAttribute('aria-required', 'true');
      }
      for (const name of ['Z axis', 'Cell ontology ID']) {
        expect(screen.getByRole('combobox', { name })).toHaveAttribute('aria-required', 'false');
      }
    });
  });

  describe('requirements', () => {
    function listItems(group: HTMLElement, name: string): (string | undefined)[] {
      const list = within(group).getByRole('list', { name });
      return within(list)
        .getAllByRole('listitem')
        .map((item) => item.textContent?.trim());
    }

    it('lists the data upload requirements as labeled lists', () => {
      const group = screen.getByRole('group', { name: 'Data upload requirements' });

      expect(within(group).queryByRole('table')).toBeNull();
      expect(listItems(group, 'Required columns')).toEqual(['X', 'Y', 'Cell type']);
      expect(listItems(group, 'Optional columns')).toEqual(['Z', 'Cell ontology ID']);
      expect(listItems(group, 'Supported format')).toEqual(['CSV']);
    });

    it('lists the color map requirements when uploading a color map', async () => {
      await userEvent.click(screen.getByText('Upload color map'));
      fixture.detectChanges();
      const group = await screen.findByRole('group', { name: 'Custom color map requirements' });

      expect(within(group).queryByRole('table')).toBeNull();
      expect(listItems(group, 'Required columns')).toEqual(['Cell type', 'Cell color']);
      expect(listItems(group, 'Supported format')).toEqual(['CSV']);
    });
  });

  describe('upload buttons', () => {
    it('have distinct accessible names', async () => {
      expect(screen.getByRole('button', { name: 'Upload CSV for cell data' })).toBeInTheDocument();

      await userEvent.click(screen.getByText('Upload color map'));
      fixture.detectChanges();
      expect(await screen.findByRole('button', { name: 'Upload CSV for color map' })).toBeInTheDocument();
    });
  });

  describe('metadata errors', () => {
    it('explains invalid age and thickness values', async () => {
      await userEvent.type(screen.getByRole('spinbutton', { name: 'Age' }), '150');
      await userEvent.type(screen.getByRole('spinbutton', { name: 'Thickness (µm)' }), '-1');
      await userEvent.tab();

      expect(await screen.findByText('Enter a whole number, 0–120')).toBeInTheDocument();
      expect(screen.getByText('Enter 0 or more')).toBeInTheDocument();
    });
  });

  describe('visualize button', () => {
    const getVisualizeButton = () => screen.getByRole('button', { name: 'Visualize' });

    it('stays focusable and explains why it is unavailable before an upload', async () => {
      const button = getVisualizeButton();
      expect(button).not.toHaveAttribute('disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAccessibleDescription('Please upload a dataset.');

      const submitSpy = jest.spyOn(instance, 'submit');
      await userEvent.click(button);
      expect(submitSpy).not.toHaveBeenCalled();
    });

    it('asks for the remaining required fields once a dataset is uploaded', () => {
      instance.setNodes(sampleNodes);
      instance.visualizationForm.controls.headers.patchValue({ cellType: '' });
      fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
      fixture.detectChanges();

      expect(getVisualizeButton()).toHaveAccessibleDescription('Please complete the required fields above.');
    });
  });

  describe('color map toggle', () => {
    it('has a descriptive accessible name', () => {
      expect(screen.getByLabelText('Color map')).toHaveClass('mat-button-toggle-group');
    });
  });

  describe('setNodes()', () => {
    it('checks for required keys, if missing tell the user the missing columns', async () => {
      const nodeDataEl = screen.getAllByTestId(testId)[0];
      const data = new File([csvNodeDataWrongKeys], 'blah.csv', { type: 'text/csv' });
      const spy = jest.spyOn(instance.visualizationForm, 'patchValue');
      await userEvent.upload(nodeDataEl, data);
      fixture.autoDetectChanges();
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(spy).toHaveBeenCalledTimes(0);
      expect(instance.columnErrorActionMessage).toMatch(/Please select the required column header: cell type/);
      expect(screen.getByText(/Please select the required column header/).closest('[role="alert"]')).not.toBeNull();
    });

    it('sets nodes', async () => {
      const priedInstance = instance as unknown as { nodes: Record<string, unknown>[] };
      instance.setNodes(sampleNodes);
      expect(priedInstance.nodes).toEqual(processedSampleData.nodes);
    });

    it('sets default cell type as DEFAULT_NODE_TARGET_SELECTOR if data includes that cell type', async () => {
      const sampleNodes2 = [
        createNodeEntry(nodeTargetKey, 'a', 0, 0),
        createNodeEntry(nodeTargetKey, 'b', 0, 2),
        createNodeEntry(nodeTargetKey, DEFAULT_NODE_TARGET_SELECTOR, 0, 4),
      ];
      instance.setNodes(sampleNodes2);
      expect(instance.visualizationForm.controls['parameters'].value.nodeTargetValue).toEqual(
        DEFAULT_NODE_TARGET_SELECTOR,
      );
    });
  });

  describe('clearNodes()', () => {
    it('clears nodes and node load errors', async () => {
      const priedInstance = instance as unknown as { nodes: Record<string, unknown>[] };
      instance.setNodes(sampleNodes);
      instance.clearNodes();
      expect(priedInstance.nodes).toBeUndefined();
    });
  });

  describe('hasValidNodes()', () => {
    it('checks for valid nodes', async () => {
      instance.setNodes(sampleNodes);
      expect(instance.hasValidNodes()).toBeTruthy();
    });
  });

  describe('hasValidData()', () => {
    it('checks for valid data', async () => {
      instance.setNodes(sampleNodes);
      expect(instance.hasValidData()).toBeTruthy();
    });
  });

  describe('setCustomColorMap()', () => {
    it('shows error if invalid color map file type', async () => {
      const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
      const toggleHarness = await loader.getAllHarnesses(MatButtonToggleHarness);
      await toggleHarness[1].check();
      fixture.autoDetectChanges();

      const data = new File([csvColorMap], 'blah', { type: 'text/invalid' });
      const colorMapEl = screen.getAllByTestId(testId)[1];
      await userEvent.upload(colorMapEl, data, { applyAccept: false });
      fixture.autoDetectChanges();

      expect(instance.colorErrorMessage).toMatch(/Invalid file type/);
    });
    it('shows error if invalid color map keys', async () => {
      const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
      const toggleHarness = await loader.getAllHarnesses(MatButtonToggleHarness);
      await toggleHarness[1].check();
      fixture.autoDetectChanges();

      const data = new File([csvColorMapWrongKeys], 'blah.csv', { type: 'text/csv' });
      const colorMapEl = screen.getAllByTestId(testId)[1];
      await userEvent.upload(colorMapEl, data);
      fixture.autoDetectChanges();
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(instance.colorErrorMessage).toMatch(/Required columns? missing/);
    });
  });

  describe('clearCustomColorMap()', () => {
    it('clears color map and color map load errors', async () => {
      const priedInstance = instance as unknown as { colorMap: ColorMapEntry[] };
      instance.setCustomColorMap(sampleColorMap);
      instance.clearCustomColorMap();
      expect(priedInstance.colorMap).toBeUndefined();
    });
  });

  describe('hasValidCustomColorMap()', () => {
    it('checks if valid custom color map', async () => {
      instance.setCustomColorMap(sampleColorMap);
      expect(instance.hasValidCustomColorMap()).toBeTruthy();
    });
  });

  describe('submit()', () => {
    it('submits', async () => {
      const dataService = TestBed.inject(VisualizationDataService);
      const setDataSpy = jest.spyOn(dataService, 'setData');

      instance.setNodes(sampleNodes);
      instance.setCustomColorMap(sampleColorMap);
      instance.submit();

      expect(setDataSpy).toHaveBeenCalled();
    });

    it("doesn't submit if no nodes", async () => {
      const dataService = TestBed.inject(VisualizationDataService);
      const setDataSpy = jest.spyOn(dataService, 'setData');

      instance.setCustomColorMap(sampleColorMap);
      instance.clearNodes();
      instance.submit();

      expect(setDataSpy).toHaveBeenCalledTimes(0);
    });

    it('uses custom color map on submit', async () => {
      const dataService = TestBed.inject(VisualizationDataService);
      const setDataSpy = jest.spyOn(dataService, 'setData');

      instance.setNodes(sampleNodes);
      instance.setCustomColorMap(sampleColorMap);
      instance.visualizationForm.value.colorMapType = 'custom';
      instance.submit();

      expect(setDataSpy).toHaveBeenCalled();
    });

    it('submits metadata', async () => {
      const dataService = TestBed.inject(VisualizationDataService);
      const setDataSpy = jest.spyOn(dataService, 'setData');

      instance.setNodes(sampleNodes);
      instance.visualizationForm.value.metadata = sampleMetadata;
      instance.submit();

      expect(setDataSpy).toHaveBeenCalled();
    });

    it('uses empty object as metadata if no metadata', async () => {
      const dataService = TestBed.inject(VisualizationDataService);
      const setDataSpy = jest.spyOn(dataService, 'setData');

      instance.setNodes(sampleNodes);
      instance.visualizationForm.value.metadata = undefined;

      instance.submit();

      expect(setDataSpy).toHaveBeenCalled();
    });

    it('passes the distance threshold to the visualization', () => {
      const dataService = TestBed.inject(VisualizationDataService);
      const setDataSpy = jest.spyOn(dataService, 'setData');

      instance.setNodes(sampleNodes);
      instance.visualizationForm.controls.parameters.patchValue({ distanceThreshold: 50 });
      instance.submit();

      expect(setDataSpy).toHaveBeenCalledWith(expect.objectContaining({ maxEdgeDistance: 50 }));
    });

    it('converts coordinates to micrometers using the pixel sizes', () => {
      const dataService = TestBed.inject(VisualizationDataService);
      const setDataSpy = jest.spyOn(dataService, 'setData');
      const nodes = [createNodeEntry(nodeTargetKey, 'a', 1, 2), createNodeEntry(nodeTargetKey, 'b', 3, 4)];

      instance.setNodes(nodes);
      instance.visualizationForm.controls.parameters.patchValue({ pixelSizeX: 2, pixelSizeY: 0.5, pixelSizeZ: 3 });
      instance.submit();

      const { nodes: nodesView, metadata } = setDataSpy.mock.calls[0][0] as {
        nodes: { data: Record<string, unknown>[] };
        metadata: Metadata;
      };
      expect(nodesView.data).toEqual([
        { [nodeTargetKey]: 'a', x: 2, y: 1 },
        { [nodeTargetKey]: 'b', x: 6, y: 2 },
      ]);
      expect(nodes[0]).toEqual({ [nodeTargetKey]: 'a', x: 1, y: 2 });
      expect(metadata.pixelSize).toEqual('2 × 0.5');
    });

    it('shows a single pixel size when every axis has the same size', () => {
      const dataService = TestBed.inject(VisualizationDataService);
      const setDataSpy = jest.spyOn(dataService, 'setData');

      instance.setNodes(sampleNodes);
      instance.visualizationForm.controls.parameters.patchValue({ pixelSizeX: 0.65, pixelSizeY: 0.65 });
      instance.submit();

      expect(setDataSpy).toHaveBeenCalledWith(
        expect.objectContaining({ metadata: expect.objectContaining({ pixelSize: 0.65 }) }),
      );
    });
  });

  describe('parameters', () => {
    it('accepts pixel sizes below 1', () => {
      instance.setNodes(sampleNodes);
      instance.visualizationForm.controls.parameters.patchValue({ pixelSizeX: 0.65 });

      expect(instance.hasValidData()).toBe(true);
    });

    it('requires a distance threshold and pixel sizes greater than 0', () => {
      instance.setNodes(sampleNodes);
      instance.visualizationForm.controls.parameters.patchValue({ distanceThreshold: -5 });
      expect(instance.hasValidData()).toBe(false);

      instance.visualizationForm.controls.parameters.patchValue({ distanceThreshold: 50, pixelSizeY: -1 });
      expect(instance.hasValidData()).toBe(false);
    });

    it('explains invalid distance threshold and pixel size values', async () => {
      instance.setNodes(sampleNodes);
      fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
      fixture.detectChanges();

      const threshold = screen.getByRole('spinbutton', { name: 'Distance threshold (µm)' });
      await userEvent.clear(threshold);
      await userEvent.type(threshold, '0');
      await userEvent.tab();

      expect(await screen.findByText('Enter more than 0')).toBeInTheDocument();
    });
  });

  describe('parse errors', () => {
    it('shows parse errors', async () => {
      const nodeDataEl = screen.getAllByTestId('file-upload')[0];
      const data = new File([csvNodeDataMissingValues], 'blah.csv', { type: 'text/csv' });
      await userEvent.upload(nodeDataEl, data);
      instance.clearCustomColorMap();
      fixture.autoDetectChanges();
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(instance.nodesErrorMessage).toMatch(/Invalid file/);
    });

    it('shows parse error (cause is Error type)', async () => {
      const priedInstance = instance as unknown as { formatErrorMessage: (error: ExtendedFileLoadError) => string };
      const testError: ExtendedFileLoadError = {
        type: 'parse-error',
        cause: new Error(),
      };
      expect(priedInstance.formatErrorMessage(testError)).toMatch(
        'Required color format not detected. Please use #RRGGBB or [R, G, B].',
      );
    });

    it('shows parse errors (cause is some other type)', async () => {
      const priedInstance = instance as unknown as { formatErrorMessage: (error: ExtendedFileLoadError) => string };
      const testError: ExtendedFileLoadError = {
        type: 'parse-error',
        cause: 'whatever',
      };
      expect(priedInstance.formatErrorMessage(testError)).toMatch(/Invalid file: too many invalid rows/);
    });

    it('returns empty string if no error type', async () => {
      const priedInstance = instance as unknown as { formatErrorMessage: (error: ExtendedFileLoadError) => string };
      const testError = {
        type: undefined,
        cause: 'whatever',
      } as unknown as ExtendedFileLoadError;
      expect(priedInstance.formatErrorMessage(testError)).toMatch('');
    });

    it('returns number of additional errors', async () => {
      const csvNodeDataMissingValuesMany = `Cell Type,x,y
      a,0
      b,1
      c,2
      d,3
      e,4
      f,5`;

      const nodeDataEl = screen.getAllByTestId('file-upload')[0];
      const data = new File([csvNodeDataMissingValuesMany], 'blah.csv', { type: 'text/csv' });
      await userEvent.upload(nodeDataEl, data);
      instance.clearCustomColorMap();
      fixture.autoDetectChanges();
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(instance.nodesErrorMessage).toMatch(/and 1 more rows/);
    });
  });
});
