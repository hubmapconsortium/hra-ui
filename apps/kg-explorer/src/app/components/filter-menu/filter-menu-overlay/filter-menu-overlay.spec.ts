import { FormControl } from '@angular/forms';
import { render } from '@testing-library/angular';

import { FilterOption } from '../../../utils/utils';
import { FilterMenuOverlayComponent } from './filter-menu-overlay.component';

describe('FilterMenuOverlayComponent', () => {
  const filterChanged = jest.fn();
  async function setup() {
    return render(FilterMenuOverlayComponent, {
      inputs: {
        currentFilters: ['filter1', 'filter2'],
        filterOptionCategory: {
          label: 'test-category',
          options: [
            { id: 'option1', label: 'Option 1', count: 10 },
            { id: 'option2', label: 'Option 2', count: 4 },
          ],
        },
        form: new FormControl<FilterOption[] | null>(null),
      },
      on: {
        filterChanged: filterChanged,
      },
    });
  }

  it('should select an option', async () => {
    const { fixture } = await setup();

    const component = fixture.componentInstance;
    component.selectOption({ id: 'option1', label: 'Option 1', count: 10 });
    expect(filterChanged).toHaveBeenCalled();
    expect(component.selectedOptions()).toEqual([{ id: 'option1', label: 'Option 1', count: 10 }]);
  });

  it('should remove an option', async () => {
    const { fixture } = await setup();

    const component = fixture.componentInstance;
    component.selectOption({ id: 'option1', label: 'Option 1', count: 10 });
    component.remove({ id: 'option1', label: 'Option 1', count: 10 });
    expect(filterChanged).toHaveBeenCalled();
    expect(component.selectedOptions()).toEqual([]);
  });

  it('should remove a clicked option if already selected', async () => {
    const { fixture } = await setup();

    const component = fixture.componentInstance;
    component.selectOption({ id: 'option1', label: 'Option 1', count: 10 });
    component.selectOption({ id: 'option1', label: 'Option 1', count: 10 });
    expect(component.selectedOptions()).toEqual([]);
  });

  it('navigates to a link', async () => {
    const { fixture } = await setup();

    const component = fixture.componentInstance;
    const spy = jest.spyOn(window, 'open').mockImplementation();
    component.navigateToLink('link');
    expect(spy).toHaveBeenCalledWith('link', '_blank');
  });

  it('filters options after typing in the search bar', async () => {
    const { fixture } = await setup();

    const component = fixture.componentInstance;
    component.searchControl.setValue('1');
    expect(component.filteredOptions()).toEqual([{ id: 'option1', label: 'Option 1', count: 10 }]);
  });
});
