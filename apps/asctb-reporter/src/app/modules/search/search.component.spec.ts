import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { render, screen, waitFor, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { mock } from 'jest-mock-extended';
import { of, Subject } from 'rxjs';
import { DoSearch } from '../../actions/tree.actions';
import { CloseSearch, OpenSearch } from '../../actions/ui.actions';
import { BimodalData } from '../../models/bimodal.model';
import { SearchStructure } from '../../models/tree.model';
import { TreeState } from '../../store/tree.state';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  const mockTreeData: (SearchStructure & { children: number })[] = [
    { id: 1, name: 'Heart', children: 2, x: 0, y: 0, groupName: 'Anatomical Structures' },
    { id: 2, name: 'Liver', children: 1, x: 0, y: 0, groupName: 'Anatomical Structures' },
  ];

  const mockBimodalData: BimodalData = {
    nodes: [
      { id: 3, name: 'Neuron', x: 0, y: 0, groupName: 'Cell Types' } as SearchStructure,
      { id: 4, name: 'CD4', x: 0, y: 0, groupName: 'Biomarkers' } as SearchStructure,
    ],
    links: [],
    config: {
      CT: { sort: 'Alphabetically', size: 'None' },
      BM: { sort: 'Alphabetically', size: 'None', type: 'All' },
    },
  } as unknown as BimodalData;

  const treeSignal = signal<SearchStructure[]>(mockTreeData as SearchStructure[]);
  const bimodalSignal = signal<BimodalData>(mockBimodalData);
  const emptySignal = signal<SearchStructure[]>([]);

  const mockStore = mock<Store>();
  mockStore.selectSignal.mockImplementation((selector) => {
    if (selector === TreeState.getTreeData) {
      return treeSignal;
    }
    if (selector === TreeState.getBimodal) {
      return bimodalSignal;
    }
    return emptySignal;
  });
  mockStore.selectSnapshot.mockReturnValue({
    discrepencyId: false,
    discrepencyLabel: false,
    duplicateId: false,
  });
  mockStore.dispatch.mockReturnValue(of(undefined));

  let routerEvents$: Subject<NavigationEnd>;

  beforeEach(() => {
    routerEvents$ = new Subject<NavigationEnd>();
    jest.clearAllMocks();
  });

  async function setup() {
    return render(SearchComponent, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: { events: routerEvents$ } },
      ],
    });
  }

  async function openSearchModal(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByTestId('search-trigger'));
    return screen.findByTestId('search-modal');
  }

  async function renderAndOpen() {
    const user = userEvent.setup();
    await setup();
    const modal = await openSearchModal(user);
    return { user, modal };
  }

  it('opens the modal, dispatches OpenSearch, and renders every structure', async () => {
    const { modal } = await renderAndOpen();

    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(OpenSearch));
    const options = within(modal).getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(within(modal).getByTestId('structure-option-1')).toHaveTextContent('Heart');
  });

  it('filters the list while typing in the search field', async () => {
    const { user, modal } = await renderAndOpen();
    const searchInput = within(modal).getByTestId('search-input') as HTMLInputElement;

    await user.type(searchInput, 'neuron');

    expect(within(modal).getByText('Neuron')).toBeTruthy();
    expect(within(modal).queryByText('Heart')).toBeNull();
  });

  it('updates the trigger label and dispatches DoSearch when an option is selected', async () => {
    const { user, modal } = await renderAndOpen();
    const heartOption = within(modal).getByTestId('structure-option-1');

    await user.click(heartOption);

    const triggerInput = screen.getByTestId('search-trigger-input') as HTMLInputElement;
    expect(triggerInput.value).toBe('Heart');
    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(DoSearch));
  });

  it('selects and deselects every structure via the action buttons', async () => {
    const { user } = await renderAndOpen();

    await user.click(screen.getByTestId('select-all-button'));

    expect(screen.getByTestId('search-trigger-input')).toHaveValue('Heart, Liver, Neuron, CD4');

    await user.click(screen.getByTestId('deselect-all-button'));
    expect(screen.getByTestId('search-trigger-input')).toHaveValue('');
  });

  it('resets the search state when navigation occurs', async () => {
    const { user, modal } = await renderAndOpen();
    const searchInput = within(modal).getByTestId('search-input') as HTMLInputElement;

    await user.type(searchInput, 'heart');
    await user.click(within(modal).getByTestId('structure-option-1'));
    expect(screen.getByTestId('search-trigger-input')).toHaveValue('Heart');

    routerEvents$.next(new NavigationEnd(1, '/from', '/to'));

    await waitFor(() => expect(screen.getByTestId('search-trigger-input')).toHaveValue(''));
    await waitFor(() => expect(searchInput).toHaveValue(''));
  });

  it('closes the modal through the close control and dispatches CloseSearch', async () => {
    const { user } = await renderAndOpen();

    await user.click(screen.getByTestId('close-search-button'));

    expect(screen.queryByTestId('search-modal')).toBeNull();
    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(CloseSearch));
  });
});
