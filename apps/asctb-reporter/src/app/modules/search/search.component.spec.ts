import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { NavigationEnd, Router } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { render } from '@testing-library/angular';
import { of, Subject } from 'rxjs';
import { UpdateConfig } from '../../actions/sheet.actions';
import { DiscrepencyLabel, DoSearch } from '../../actions/tree.actions';
import { CloseSearch, OpenSearch } from '../../actions/ui.actions';
import { SearchStructure } from '../../models/tree.model';
import { TreeState } from '../../store/tree.state';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  const mockTreeData = [
    { id: 1, name: 'Heart', children: 2, x: 0, y: 0, groupName: 'Anatomical Structures' },
    { id: 2, name: 'Liver', children: 1, x: 0, y: 0, groupName: 'Anatomical Structures' },
  ];

  const mockBimodal = {
    nodes: [
      { id: 3, name: 'Neuron', x: 0, y: 0, groupName: 'Cell Types' },
      { id: 4, name: 'CD4', x: 0, y: 0, groupName: 'Biomarkers' },
    ],
  };

  const routerEvents$ = new Subject();
  const mockStore = {
    selectSignal: jest.fn((selector) => {
      if (selector === TreeState.getTreeData) {
        return signal(mockTreeData);
      }
      if (selector === TreeState.getBimodal) {
        return signal(mockBimodal);
      }
      return signal([]);
    }),
    selectSnapshot: jest.fn(() => ({ discrepencyId: false, discrepencyLabel: false, duplicateId: false })),
    dispatch: jest.fn().mockReturnValue(of({})),
  };

  async function setup() {
    return await render(SearchComponent, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [NgxsModule.forRoot([])],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: { events: routerEvents$ } },
      ],
    });
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize and handle navigation', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;

    // Test initialization
    expect(component['structures']()).toHaveLength(4);
    expect(component['searchValue']()).toBe('');
    expect(component['selection']()).toEqual([]);

    // Test navigation reset
    component['searchValue'].set('test');
    component['selection'].set([mockTreeData[0] as SearchStructure]);
    routerEvents$.next(new NavigationEnd(1, '/test', '/test'));
    expect(component['searchValue']()).toBe('');
    expect(component['selection']()).toEqual([]);
  });

  it('should filter structures and toggle selection', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;

    // Test filtering by search
    component['searchValue'].set('heart');
    expect(component['filteredStructures']()[0].name).toBe('Heart');

    // Test filtering by category
    component['searchValue'].set('');
    component['categories'].set(['Cell Types']);
    expect(component['filteredStructures']()[0].name).toBe('Neuron');

    // Test selection toggle
    const struct = mockTreeData[0] as SearchStructure;
    component.toggleOption({ value: struct, selected: true } as MatListOption);
    expect(component['selection']()).toContain(struct);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(DoSearch));
    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(UpdateConfig));
    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(DiscrepencyLabel));

    // Test deselection
    component.toggleOption({ value: struct, selected: false } as MatListOption);
    expect(component['selection']()).not.toContain(struct);
  });

  it('should handle multi-select operations', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    const mockOptions = [{ value: mockTreeData[0] as SearchStructure }] as MatListOption[];

    // Test select all
    jest.spyOn(component as never, 'multiSelect').mockReturnValue({ selectAll: () => mockOptions } as never);
    component.selectAllOptions();
    expect(component['selection']()).toHaveLength(1);

    // Test deselect all
    jest.spyOn(component as never, 'multiSelect').mockReturnValue({ deselectAll: () => mockOptions } as never);
    component.deselectAllOptions();
    expect(component['selection']()).toEqual([]);

    // Test missing multiSelect
    jest.spyOn(component as never, 'multiSelect').mockReturnValue(undefined as never);
    expect(() => component.selectAllOptions()).not.toThrow();
    expect(() => component.deselectAllOptions()).not.toThrow();
  });

  it('should handle search list visibility and clicks', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;

    // Test open
    component.openSearchList();
    expect(component['searchOpen']()).toBe(true);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(OpenSearch));

    // Test close when open
    component.closeSearchList();
    expect(component['searchOpen']()).toBe(false);
    expect(mockStore.dispatch).toHaveBeenCalledWith(expect.any(CloseSearch));

    // Test no close action when already closed
    mockStore.dispatch.mockClear();
    component.closeSearchList();
    expect(mockStore.dispatch).not.toHaveBeenCalled();

    // Test outside click
    component['searchOpen'].set(true);
    component.clickOutsideSearchList({ target: document.createElement('div') } as unknown as MouseEvent);
    expect(component['searchOpen']()).toBe(false);

    // Test inside click
    component['searchOpen'].set(true);
    component.clickOutsideSearchList({ target: fixture.nativeElement } as unknown as MouseEvent);
    expect(component['searchOpen']()).toBe(true);
  });

  it('should compute derived properties', async () => {
    const { fixture } = await setup();
    const component = fixture.componentInstance;
    const struct = mockTreeData[0] as SearchStructure;

    // Test selection label
    component['selection'].set([struct, mockTreeData[1] as SearchStructure]);
    expect(component['selectionLabel']()).toBe('Heart, Liver');

    // Test selection set
    expect(component['selectionSet']().has(struct)).toBe(true);

    // Test compare function
    expect(component['selectionCompareFunction'](struct, struct)).toBe(true);
  });
});
