import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ColorMapEntry,
  DEFAULT_COLOR_MAP_KEY,
  DEFAULT_COLOR_MAP_VALUE_KEY,
  DEFAULT_NODE_TARGET_KEY,
  NodeEntry,
} from '@hra-ui/cde-visualization';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render } from '@testing-library/angular';

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
  function createNodeEntry(target: string, x: number, y: number): NodeEntry {
    return { [nodeTargetKey]: target, x, y } as NodeEntry;
  }
  const sampleNodes = [createNodeEntry('a', 0, 0), createNodeEntry('b', 0, 2), createNodeEntry('c', 0, 4)];

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

  describe('submit()', () => {
    it('submits', async () => {
      const {
        fixture: { componentInstance: instance },
      } = await render(CreateVisualizationPageComponent, {
        componentInputs: {
          organs: [
            {
              id: 'organ1',
              label: 'ORGAN1',
            },
          ],
        },
        providers: globalProviders,
      });
      instance.setNodes(sampleNodes);
      instance.setCustomColorMap(sampleColorMap);
      instance.submit();
    });
  });
});
