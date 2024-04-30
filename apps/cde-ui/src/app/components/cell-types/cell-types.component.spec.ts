import { CellTypesComponent } from './cell-types.component';
import { MatSort } from '@angular/material/sort';
import { MatHeaderRowDef, MatRowDef } from '@angular/material/table';
import { Shallow } from 'shallow-render';

describe('CellTypesComponent', () => {
  let shallow: Shallow<CellTypesComponent>;

  beforeEach(async () => {
    shallow = new Shallow(CellTypesComponent).dontMock(MatSort, MatHeaderRowDef, MatRowDef);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
