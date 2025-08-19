import { render } from '@testing-library/angular';
import { FilterMenuOverlayComponent } from './filter-menu-overlay.component';
import { FormControl } from '@angular/forms';
import { FilterOption } from '../../../utils/utils';

describe('FilterMenuOverlayComponent', () => {
  it('should render', async () => {
    const promise = render(FilterMenuOverlayComponent, {
      inputs: {
        currentFilters: ['filter1', 'filter2'],
        filterOptionCategory: {
          label: 'test-category',
        },
        form: new FormControl<FilterOption[] | null>(null),
      },
    });
    await expect(promise).resolves.toBeTruthy();
  });
});
