import { Component, inject } from '@angular/core';
import { FilterSexEnum, SpatialSearch } from '@hra-api/ng-client';
import { HraCommonModule } from '@hra-ui/common';
import { NgxsModule, Store } from '@ngxs/store';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AddSearch, RemoveSearch, SetSelectedSearches } from './spatial-search-filter.actions';
import { SpatialSearchFilterSelectors } from './spatial-search-filter.selectors';
import { SpatialSearchFilterState } from './spatial-search-filter.state';

@Component({
  selector: 'ccf-spatial-search-filter-host',
  imports: [HraCommonModule],
  template: `
    <div data-testid="items-count">{{ (items$ | async)?.length ?? 0 }}</div>
    <div data-testid="searches-count">{{ (searches$ | async)?.length ?? 0 }}</div>
    <div data-testid="selected-count">{{ (selected$ | async)?.length ?? 0 }}</div>

    <button type="button" aria-label="add-alpha" (click)="addAlpha()">Add Alpha</button>
    <button type="button" aria-label="add-beta" (click)="addBeta()">Add Beta</button>
    <button type="button" aria-label="remove-first" (click)="removeFirst()">Remove First</button>
    <button type="button" aria-label="apply-selections" (click)="applySelections()">Apply Selections</button>

    <ul>
      @for (item of items$ | async; track item.id) {
        <!-- eslint-disable-next-line @angular-eslint/template/prefer-template-literal -->
        <li [attr.data-testid]="'item-' + item.id">{{ item.description }} | selected: {{ item.selected }}</li>
      }
    </ul>
  `,
})
class SpatialSearchFilterHostComponent {
  private readonly store = inject(Store);

  readonly items$ = this.store.select(SpatialSearchFilterSelectors.items);
  readonly searches$ = this.store.select(SpatialSearchFilterSelectors.searches);
  readonly selected$ = this.store.select(SpatialSearchFilterSelectors.selectedSearches);

  readonly alphaSearch: SpatialSearch = { target: 'left_kidney', x: 1, y: 2, z: 3, radius: 4 };
  readonly betaSearch: SpatialSearch = { target: 'right_lung', x: 10.4, y: 5.2, z: 7.1, radius: 2.5 };

  addAlpha(): void {
    this.store.dispatch(new AddSearch(FilterSexEnum.Female, 'kidney', this.alphaSearch));
  }

  addBeta(): void {
    this.store.dispatch(new AddSearch(FilterSexEnum.Male, 'lung', this.betaSearch));
  }

  removeFirst(): void {
    const [first] = this.store.selectSnapshot(SpatialSearchFilterSelectors.items);
    if (first) {
      this.store.dispatch(new RemoveSearch(first.id));
    }
  }

  applySelections(): void {
    const [first] = this.store.selectSnapshot(SpatialSearchFilterSelectors.items);
    this.store.dispatch(new SetSelectedSearches(first ? [{ ...first, selected: true }] : []));
  }
}

describe('SpatialSearchFilterState', () => {
  it('adds and removes searches through the state actions', async () => {
    const user = userEvent.setup();

    await render(SpatialSearchFilterHostComponent, {
      imports: [NgxsModule.forRoot([SpatialSearchFilterState])],
    });

    await user.click(screen.getByLabelText('add-alpha'));

    const addedItem = await screen.findByTestId('item-left_kidney-4-1,2,3');
    expect(addedItem.textContent?.trim()).toContain('Female, Kidney, 4.0 mm, X: 1.0, Y: 2.0, Z: 3.0');
    expect(addedItem.textContent).toContain('selected: true');
    expect(screen.getByTestId('items-count')).toHaveTextContent('1');
    expect(screen.getByTestId('searches-count')).toHaveTextContent('1');
    expect(screen.getByTestId('selected-count')).toHaveTextContent('1');

    await user.click(screen.getByLabelText('remove-first'));

    await waitFor(() => {
      expect(screen.queryByTestId('item-left_kidney-4-1,2,3')).toBeNull();
      expect(screen.getByTestId('items-count')).toHaveTextContent('0');
      expect(screen.getByTestId('selected-count')).toHaveTextContent('0');
    });
  });

  it('sets selected searches and deselects non-matching items', async () => {
    const user = userEvent.setup();

    await render(SpatialSearchFilterHostComponent, {
      imports: [NgxsModule.forRoot([SpatialSearchFilterState])],
    });

    await user.click(screen.getByLabelText('add-alpha'));
    await user.click(screen.getByLabelText('add-beta'));

    expect(screen.getByTestId('selected-count')).toHaveTextContent('2');

    await user.click(screen.getByLabelText('apply-selections'));

    await waitFor(() => {
      expect(screen.getByTestId('selected-count')).toHaveTextContent('1');
      expect(screen.getByTestId('item-left_kidney-4-1,2,3')).toHaveTextContent('selected: true');
      expect(screen.getByTestId('item-right_lung-2.5-10.4,5.2,7.1')).toHaveTextContent('selected: false');
    });
  });
});
