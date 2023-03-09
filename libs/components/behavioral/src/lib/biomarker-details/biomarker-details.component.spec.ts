import { Shallow } from 'shallow-render';
import { BiomarkerDetailsComponent } from './biomarker-details.component';

describe('ScreenSizeNoticeComponent', () => {
  let shallow: Shallow<BiomarkerDetailsComponent>;

  beforeEach(() => {
    shallow = new Shallow(BiomarkerDetailsComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
