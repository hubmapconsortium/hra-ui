import { MatTableModule } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { SourceListComponent } from './source-list.component';

describe('SourceListComponent', () => {
  let shallow: Shallow<SourceListComponent>;
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
});
