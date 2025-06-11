import { render } from '@testing-library/angular';
import { NavigationItemComponent } from './navigation-item.component';

describe('NavigationItemComponent', () => {
  it('should render', async () => {
    const promise = render(NavigationItemComponent, {
      inputs: {
        navigationItem: {
          type: 'item',
          label: 'Item',
          icon: 'icon',
          url: '',
        },
        baseUrl: '',
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
