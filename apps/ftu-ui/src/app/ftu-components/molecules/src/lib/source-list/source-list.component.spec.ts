import { SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { SourceListComponent, SourceListItem } from './source-list.component';

describe('SourceListComponent', () => {
  let shallow: Shallow<SourceListComponent>;
  const testItem = {
    link: 'test',
    authors: ['test'],
    year: 2000,
    title: 'test',
    doi: 'test',
    label: 'test',
  } as SourceListItem;
  const testSources = [testItem] as SourceListItem[];
  beforeEach(() => {
    shallow = new Shallow(SourceListComponent).dontMock(MatTableModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should initialize showTable to be true', async () => {
    const { instance } = await shallow.render();
    expect(instance.showTable).toBe(true);
  });

  it('should toggle showTable on toggleTable() method call', async () => {
    const { instance } = await shallow.render();
    instance.toggleTable();
    expect(instance.showTable).toBe(false);
    instance.toggleTable();
    expect(instance.showTable).toBe(true);
  });

  it('should emit selectionChanged when onSelectionChange is called', async () => {
    const { instance } = await shallow.render({ bind: { sources: testSources } });
    let emittedValue: SourceListItem[] | undefined;

    instance.selectionChanged.subscribe((value: SourceListItem[]) => {
      emittedValue = value;
    });

    // Mock the sourceTable with selected items
    instance.sourceTable = {
      selection: {
        selected: testSources,
      },
    } as any;

    instance.onSelectionChange();

    expect(instance.selectedCount).toBe(1);
    expect(emittedValue).toEqual(testSources);
  });
});
