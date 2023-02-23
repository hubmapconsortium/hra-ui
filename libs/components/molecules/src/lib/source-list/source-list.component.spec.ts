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
});
