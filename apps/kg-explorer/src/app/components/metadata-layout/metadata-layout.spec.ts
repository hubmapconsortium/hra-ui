import { render } from '@testing-library/angular';

import { MetadataLayoutComponent } from './metadata-layout.component';

describe('MetadataLayoutComponent', () => {
  it('should render', async () => {
    const promise = render(MetadataLayoutComponent, {
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
