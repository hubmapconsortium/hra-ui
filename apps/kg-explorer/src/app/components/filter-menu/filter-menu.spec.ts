import { render } from '@testing-library/angular';
import { FilterMenuComponent } from './filter-menu.component';

describe('FilterMenuComponent', () => {
  it('should render', async () => {
    const promise = render(FilterMenuComponent, {
      inputs: {
        filterCategories: [
          {
            label: 'Test Category',
          },
          {
            label: 'Test Category',
          },
          {
            label: 'Test Category',
          },
          {
            label: 'Test Category',
          },
          {
            label: 'Test Category',
          },
          {
            label: 'Test Category',
          },
        ],
        currentFilters: {},
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
