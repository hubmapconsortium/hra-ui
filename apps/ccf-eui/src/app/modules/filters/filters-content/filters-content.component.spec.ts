import { Component } from '@angular/core';
import { Filter, FilterSexEnum, SpatialSearch } from '@hra-api/ng-client';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { DEFAULT_FILTER } from '../../../core/store/data/data.state';
import { SpatialSearchFilterItem } from '../../../core/store/spatial-search-filter/spatial-search-filter.state';
import { SpatialSearchFlowService } from '../../../shared/services/spatial-search-flow.service';
import { FiltersContentComponent } from './filters-content.component';

describe('FiltersContentComponent', () => {
  const technologyOptions = ['Tech A'];
  const providerOptions = ['Provider A'];
  const consortiaOptions = ['Consortium A'];

  const search: SpatialSearch = { x: 0, y: 0, z: 0, radius: 1, target: 'body' } as SpatialSearch;
  const spatialItems: SpatialSearchFilterItem[] = [
    { id: 's1', search, sex: FilterSexEnum.Male, selected: true, description: 'Male heart' },
    { id: 's2', search, sex: FilterSexEnum.Female, selected: false, description: 'Female lung' },
  ];

  async function renderComponent(overrides: Partial<SpatialSearchFilterItem>[] = []) {
    const spatialSearchItems = spatialItems.map((item, idx) => ({ ...item, ...overrides[idx] }));
    const spatialSearchSelectionChange = jest.fn();
    const spatialSearchRemoved = jest.fn();
    const spatialSearchFlowService = { startSpatialSearchFlow: jest.fn() };

    @Component({
      imports: [FiltersContentComponent],
      template: `
        <ccf-filters-content
          [technologyOptions]="technologyOptions"
          [providerOptions]="providerOptions"
          [consortiaOptions]="consortiaOptions"
          [spatialSearchItems]="spatialSearchItems"
          [(filter)]="filter"
          (spatialSearchSelectionChange)="spatialSearchSelectionChange($event)"
          (spatialSearchRemoved)="spatialSearchRemoved($event)"
        />
      `,
    })
    class HostComponent {
      filter: Filter = { ...DEFAULT_FILTER, spatialSearches: [] };
      technologyOptions = technologyOptions;
      providerOptions = providerOptions;
      consortiaOptions = consortiaOptions;
      spatialSearchItems = spatialSearchItems;
      spatialSearchSelectionChange = spatialSearchSelectionChange;
      spatialSearchRemoved = spatialSearchRemoved;
    }

    const result = await render(HostComponent, {
      providers: [{ provide: SpatialSearchFlowService, useValue: spatialSearchFlowService }],
    });

    return { ...result, spatialSearchSelectionChange, spatialSearchRemoved };
  }

  it('updates the filter model when sex is changed and Apply clicked', async () => {
    const { fixture } = await renderComponent([{ selected: false }, { selected: false }]);

    await userEvent.click(screen.getByLabelText('Sex'));
    const femaleOption = await screen.findByRole('option', { name: FilterSexEnum.Female });
    await fireEvent.click(femaleOption);

    await userEvent.click(screen.getByRole('button', { name: /apply/i }));

    await waitFor(() => {
      expect(fixture.componentInstance.filter.sex).toBe(FilterSexEnum.Female);
    });
  });

  it('resets the form and emits removals', async () => {
    const { spatialSearchRemoved, spatialSearchSelectionChange } = await renderComponent();

    await userEvent.click(screen.getByRole('button', { name: /reset/i }));

    await waitFor(() => {
      expect(spatialSearchRemoved).toHaveBeenCalledTimes(2);
      expect(spatialSearchRemoved).toHaveBeenCalledWith('s1');
      expect(spatialSearchSelectionChange).toHaveBeenCalledWith([]);
    });
  });

  it('disables incompatible sex options when spatial searches are present', async () => {
    await renderComponent();

    await userEvent.click(screen.getByLabelText('Sex'));
    const femaleOption = await screen.findByRole('option', { name: FilterSexEnum.Female });

    expect(femaleOption).toHaveAttribute('aria-disabled', 'true');
  });

  it('forwards spatial search selection changes', async () => {
    const { container, spatialSearchSelectionChange } = await renderComponent();

    const list = container.querySelector('ccf-spatial-search-list');
    expect(list).not.toBeNull();

    fireEvent(list as Element, new CustomEvent('selectionChanged', { detail: [{ id: 'new' }], bubbles: true }));

    await waitFor(() => {
      expect(spatialSearchSelectionChange).toHaveBeenCalled();
      expect(spatialSearchSelectionChange.mock.calls[0][0].detail).toEqual([{ id: 'new' }]);
    });
  });
});
