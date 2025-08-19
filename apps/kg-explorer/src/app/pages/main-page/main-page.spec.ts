import { render } from '@testing-library/angular';
import { MainPageComponent } from './main-page.component';
import { provideHttpClient } from '@angular/common/http';

describe('MainPageComponent', () => {
  it('should render', async () => {
    const promise = render(MainPageComponent, {
      providers: [provideHttpClient()],
      inputs: {
        data: {},
        columns: [],
        asctbTermOccurrences: [],
        ontologyTree: { root: 'test', nodes: {} },
        cellTypeTree: { root: 'test', nodes: {} },
        biomarkerTree: { root: 'test', nodes: {} },
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
