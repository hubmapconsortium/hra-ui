import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ColorMapEntry,
  DEFAULT_COLOR_MAP_KEY,
  DEFAULT_COLOR_MAP_VALUE_KEY,
  DEFAULT_NODE_TARGET_KEY,
  DEFAULT_NODE_TARGET_VALUE,
  NodeEntry,
} from '@hra-ui/cde-visualization';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { VisualizationDataService } from '../../services/visualization-data-service/visualization-data-service.service';
import { CreateVisualizationPageComponent } from './create-visualization-page.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('CreateVisualizationPageComponent', () => {
  const globalProviders = [provideIcons(), provideHttpClient(), provideHttpClientTesting()];
  const nodeTargetKey = DEFAULT_NODE_TARGET_KEY;
  function createNodeEntry(targetKey: string, target: string, x: number, y: number): NodeEntry {
    return { [targetKey]: target, x, y } as NodeEntry;
  }
  const sampleNodes = [
    createNodeEntry(nodeTargetKey, 'a', 0, 0),
    createNodeEntry(nodeTargetKey, 'b', 0, 2),
    createNodeEntry(nodeTargetKey, 'c', 0, 4),
  ];
  const processedSampleData = {
    colorMapKey: 'cell_type',
    colorMapValueKey: 'cell_color',
    metadata: {},
    nodeTargetKey: 'Cell Type',
    nodeTargetValue: 'a',
    nodes: [
      { 'Cell Type': 'a', x: 0, y: 0 },
      { 'Cell Type': 'b', x: 0, y: 2 },
      { 'Cell Type': 'c', x: 0, y: 4 },
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

  const csvNodeDataWrongKeys = `BADKEY,x,y
    a,0,0
    b,1,2`;

  // const csvColorMap = `cell_id,cell_type,cell_color
  //   0,cell1,[0,0,0]
  //   1,cell2,[1,1,1]`;

  // const csvColorMapWrongKeys = `BADKEY,cell_type,cell_color
  //   0,cell1,[0,0,0]
  //   1,cell2,[1,1,1]`;

  let instance: CreateVisualizationPageComponent;

  beforeEach(async () => {
    const { fixture } = await render(CreateVisualizationPageComponent, {
      componentInputs: {
        organs: [],
      },
      providers: globalProviders,
    });

    instance = fixture.componentInstance;
    await fixture.whenStable();
  });

  describe('setNodes()', () => {
    it('checks for required keys, if missing do not update data', async () => {
      const nodeDataEl = screen.getAllByTestId('file-upload')[0];
      const data = new File([csvNodeDataWrongKeys], 'blah.csv', { type: 'text/csv' });
      await userEvent.upload(nodeDataEl, data);
      const spy = jest.spyOn(instance.visualizationForm, 'patchValue');
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('sets nodes', async () => {
      const priedInstance = instance as unknown as { nodes: NodeEntry[] };
      instance.setNodes(sampleNodes);
      expect(priedInstance.nodes).toEqual(processedSampleData.nodes);
    });

    it('sets default cell type as DEFAULT_NODE_TARGET_VALUE if data includes that cell type', async () => {
      const sampleNodes2 = [
        createNodeEntry(nodeTargetKey, 'a', 0, 0),
        createNodeEntry(nodeTargetKey, 'b', 0, 2),
        createNodeEntry(nodeTargetKey, DEFAULT_NODE_TARGET_VALUE, 0, 4),
      ];
      instance.setNodes(sampleNodes2);
      expect(instance.visualizationForm.value.nodeTargetValue).toEqual(DEFAULT_NODE_TARGET_VALUE);
    });
  });

  describe('clearNodes()', () => {
    it('clears nodes and node load errors', async () => {
      const priedInstance = instance as unknown as { nodes: NodeEntry[] };
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

  // describe('setCustomColorMap()', () => {
  //   it('sets a custom color map', async () => {
  //     const toggleCustom = screen.getByTestId('upload-custom');
  //     console.log(toggleCustom)
  //     await userEvent.click(toggleCustom).then(() => {
  //       instance.visualizationForm.value.colorMapType = 'custom';
  //       console.log(instance.useCustomColorMap);
  //       const colorMapEl = screen.getByTestId('color-map-upload'); //this doesn't work
  //       console.log(colorMapEl)
  //       const data = new File([csvColorMap], 'blah.csv', { type: 'text/csv' });
  //       userEvent.upload(colorMapEl, data);
  //     })
  //   });
  // });

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

      expect(setDataSpy).toHaveBeenCalledWith(processedSampleData);
    });

    it("doesn't submit if no nodes", async () => {
      const dataService = TestBed.inject(VisualizationDataService);
      const setDataSpy = jest.spyOn(dataService, 'setData');

      instance.setCustomColorMap(sampleColorMap);
      instance.clearNodes();
      instance.submit();

      expect(setDataSpy).toHaveBeenCalledTimes(0);
    });
  });
});
