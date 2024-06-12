import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideIcons } from '@hra-ui/cdk/icons';
import { render } from '@testing-library/angular';

import { CreateVisualizationPageComponent } from './create-visualization-page.component';

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('CreateVisualizationPageComponent', () => {
  const globalProviders = [provideIcons(), provideHttpClient(), provideHttpClientTesting()];

  describe('submit()', () => {
    it('submit', async () => {
      const component = await render(CreateVisualizationPageComponent, {
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
      // component.fixture.componentInstance.setNodes([{x: 0, y: 0, z: 0, 'Cell Type': 'T-Killer'}])
      component.fixture.componentInstance.submit();
    });
  });
});
