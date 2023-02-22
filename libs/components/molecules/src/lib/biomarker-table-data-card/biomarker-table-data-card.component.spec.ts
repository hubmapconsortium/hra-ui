import { MatTableModule } from '@angular/material/table';
import { Shallow } from 'shallow-render';
import { BiomarkerTableDataCardComponent } from './biomarker-table-data-card.component';

describe('BiomarkerTableDataCardComponent', () => {
  let shallow: Shallow<BiomarkerTableDataCardComponent>;
  beforeEach(() => {
    shallow = new Shallow(BiomarkerTableDataCardComponent).dontMock(MatTableModule);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
