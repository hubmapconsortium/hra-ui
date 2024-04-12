import { VisualCardComponent } from './visual-card.component';
import { Shallow } from 'shallow-render';

describe('VisualCardComponent', () => {
  let shallow: Shallow<VisualCardComponent>;

  beforeEach(async () => {
    shallow = new Shallow(VisualCardComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
