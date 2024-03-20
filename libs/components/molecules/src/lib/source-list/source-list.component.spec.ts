import { SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { SourceListComponent, SourceListItem } from './source-list.component';

describe('SourceListComponent', () => {
  let shallow: Shallow<SourceListComponent>;
  const testSources = [{ link: 'test' }] as SourceListItem[];
  beforeEach(() => {
    shallow = new Shallow(SourceListComponent).dontMock(MatTableModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should select all rows on source change', async () => {
    const { instance } = await shallow.render({ bind: { sources: [] } });
    const changes: SimpleChanges = {
      sources: { currentValue: testSources, previousValue: [], isFirstChange: () => true, firstChange: true },
    };
    instance.ngOnChanges(changes);
    expect(instance.selectionChanged.emit).toHaveBeenCalled();
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

  it('checks if all rows selected', async () => {
    const { instance } = await shallow.render();
    expect(instance.isAllSelected()).toBeTruthy();
  });

  it('toggles row selection', async () => {
    const { instance } = await shallow.render();
    instance.toggleRow({ link: 'test' });
    expect(instance.selectionChanged.emit).toHaveBeenCalledWith([{ link: 'test' }]);
  });
});
