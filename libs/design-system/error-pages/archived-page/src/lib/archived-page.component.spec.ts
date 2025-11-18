import { render } from '@testing-library/angular';
import { ArchivedPageComponent } from './archived-page.component';

describe('ArchivedPageComponent', () => {
  it('should render', async () => {
    const promise = render(ArchivedPageComponent, {
      inputs: {
        archivedPath: 'test-path',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
