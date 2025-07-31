import { BiomarkerTableDataIconComponent } from './biomarker-table-data-icon.component';
import { Shallow } from 'shallow-render';

describe('BiomarkerTableDataIconComponent', () => {
  let shallow: Shallow<BiomarkerTableDataIconComponent>;

  beforeEach(() => {
    shallow = new Shallow(BiomarkerTableDataIconComponent);
  });

  it('should create BiomarkerTableDataIconComponent', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
