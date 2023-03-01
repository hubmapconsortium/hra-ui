import { Shallow } from 'shallow-render';
import { LabelBoxComponent } from './label-box.component';

describe('LabelBoxComponent', () => {
  let shallow: Shallow<LabelBoxComponent>;

  beforeEach(() => {
    shallow = new Shallow(LabelBoxComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
