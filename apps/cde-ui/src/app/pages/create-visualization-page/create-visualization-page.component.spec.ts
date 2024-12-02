import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleHarness } from '@angular/material/button-toggle/testing';
import { ColorMapEntry, DEFAULT_COLOR_MAP_KEY, DEFAULT_COLOR_MAP_VALUE_KEY, Metadata } from '@hra-ui/cde-visualization';
import { provideIcons } from '@hra-ui/cdk/icons';
import { DEFAULT_NODE_TARGET_SELECTOR } from '@hra-ui/node-dist-vis';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { mock } from 'jest-mock-extended';
import { VisualizationDataService } from '../../services/visualization-data-service/visualization-data.service';
import { CreateVisualizationPageComponent, ExtendedFileLoadError } from './create-visualization-page.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));
jest.mock('@hra-ui/node-dist-vis', () => ({}));
jest.mock('libs/node-dist-vis/models/src/lib/edges/generator.ts', () => ({}));

const resizeObserverInstance = mock<ResizeObserver>();
global.ResizeObserver = jest.fn(() => resizeObserverInstance);

const globalProviders = [provideIcons(), provideHttpClient(), provideHttpClientTesting()];
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

const csvColorMapWrongKeys = `BADKEY,cell_type,cell_color
  0,cell1,"[0,0,0]"
  1,cell2,"[1,1,1]"`;

describe('CreateVisualizationPageComponent', () => {
  let instance: CreateVisualizationPageComponent;
  let fixture: ComponentFixture<CreateVisualizationPageComponent>;

  beforeEach(async () => {
    jest.spyOn(Date, 'now').mockReturnValue(0);

    const context = await render(CreateVisualizationPageComponent, {
      providers: globalProviders,
      componentInputs: {
        organs: [],
      },
    });

    fixture = context.fixture;
    instance = fixture.componentInstance;
    await fixture.whenStable();
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
      expect(instance.columnErrorActionMessage).toMatch(/Please select the required column header: Cell Type/);
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
      expect(instance.colorErrorMessage).toMatch(/Required columns missing/);
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
        'Required color format not detected. Please use [R, G, B].',
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
