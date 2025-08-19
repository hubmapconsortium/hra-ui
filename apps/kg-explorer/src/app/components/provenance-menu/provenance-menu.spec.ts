import { provideHttpClient } from '@angular/common/http';
import { render } from '@testing-library/angular';

import { ProvenanceMenuComponent } from './provenance-menu.component';

describe('ProvenanceMenuComponent', () => {
  it('should render', async () => {
    const promise = render(ProvenanceMenuComponent, {
      providers: [provideHttpClient()],
      inputs: {
        rows: [],
        columns: [],
        version: '1.0',
        availableVersions: ['1.0', '2.0'],
        downloadOptions: [],
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
