import { Shallow } from 'shallow-render';
import { EmptyBiomarkerComponent } from './empty-biomarker.component';

describe('EmptyBiomarkerComponent', () => {
  let shallow: Shallow<EmptyBiomarkerComponent>;

  beforeEach(() => {
    shallow = new Shallow(EmptyBiomarkerComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
