import { render } from '@testing-library/angular';

import { VersionSelectorComponent } from './version-selector.component';

describe('VersionSelectorComponent', () => {
  it('should render', async () => {
    const promise = render(VersionSelectorComponent, {
      inputs: {
        version: '1.0',
        availableVersions: ['1.0', '2.0'],
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
