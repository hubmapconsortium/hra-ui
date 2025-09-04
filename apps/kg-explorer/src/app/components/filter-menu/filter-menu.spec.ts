import { render } from '@testing-library/angular';

import { FilterMenuComponent } from './filter-menu.component';

const mockFilterCategories = [
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
];

describe('FilterMenuComponent', () => {
  it('emits the form controls on filter change', async () => {
    const { fixture } = await render(FilterMenuComponent, {
      inputs: {
        filterCategories: mockFilterCategories,
        currentFilters: {},
      },
    });
    const instance = fixture.componentInstance;
    const spy = jest.spyOn(instance.formChanges, 'emit');
    instance.handleFilterChange();
    expect(spy).toHaveBeenCalled();
  });
});
